import {User} from './../models/User'
import bcryptjs from 'bcryptjs'
import UserEmailManager from './UserEmailManager'
import {findRoleByName, findRole} from "./RoleService";
import {Role} from "../models/Role";
import {UserInputError} from 'apollo-server-express'
const jsonwebtoken = require('jsonwebtoken')

export const auth = function ({username, password}) {
    return new Promise((resolve, reject) => {
        findUserByUsername(username).then(user => {
            if (!user) {
                reject('No user with that username/email')
            }
            if (user) {
                if (bcryptjs.compareSync(password, user.password)) {
                    let token = jsonwebtoken.sign(
                        {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            avatarurl: user.avatarurl
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: '1d'}
                    )
                    return resolve({token: token, user: user})
                } else {
                    reject('Incorrect password')
                }
            }
        })

    })

}

export const createUser = async function ({username, password, name, email, phone, role, active}) {
    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);
    let roleObject = {}

    const newUser = new User({
        username,
        email,
        password: hashPassword,
        name,
        phone,
        role,
        active,
        createdAt: Date.now()

    })
    newUser.id = newUser._id;

    roleObject = await findRole(role)

    return new Promise((resolve, rejects) => {
        newUser.save((error => {
            if (error){
                console.log(error.name)
                if(error.name == "ValidationError"){
                    throw new UserInputError(error.message, {invalidArgs: error.errors});
                }
                rejects(error)
            }
            else {
                newUser.role = roleObject
                resolve({user: newUser})

            }
        }))
    })
}


export const updateUser = async function (id, {username, name, email, phone, role, active}) {
    let updatedAt = Date.now()
    let roleObject = {}

    roleObject = await findRole(role)


    return new Promise((resolve, rejects) => {
        User.findOneAndUpdate(
            {_id: id}, {username, name, email, phone, role, active, updatedAt}, {new: true},
            (error, user) => {
                if (error) rejects(error)
                else {
                    user.role = roleObject
                    resolve({user: user})
                }
            }
        );
    })
}

export const deleteUser = function (id) {
    return new Promise((resolve, rejects) => {
        User.remove(
            {_id: id}, {},
            (error, user) => {
                if (error) rejects(error)
                else resolve(true)
            }
        );
    })
}

export const registerUser = async function ({username, password, name, email, phone}) {

    const ROLE_NAME = "user";
    let roleObject = await findRoleByName(ROLE_NAME)

    return new Promise((resolve, rejects) => {

        let salt = bcryptjs.genSaltSync(10);
        let hash = bcryptjs.hashSync(password, salt);

        let active = false;


        const newUser = new User({
            username,
            email,
            password: hash,
            name,
            phone,
            active,
            role: roleObject,
            createdAt: Date.now()

        })
        newUser.id = newUser._id;

        newUser.save((error => {
            if (error) {
                rejects(error)
            } else {
                UserEmailManager.activation(newUser.email);
                resolve({status: true, id: newUser.id, email: newUser.email});
            }
        }))

    })


}


export const findUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({}).populate('role').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findOne({_id: id}).populate('role').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findUserByUsername = function (id) {
    return new Promise((resolve, reject) => {
        User.findOne({username: id}).populate('role').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


export const changePassword = function (id, {password, passwordVerify}) {

    if (password == passwordVerify) {

        let salt = bcryptjs.genSaltSync(10);
        let hash = bcryptjs.hashSync(password, salt);

        return new Promise((resolve, rejects) => {
            User.findOneAndUpdate(
                {_id: id}, {password: hash}, {new: true},
                (error, user) => {
                    if (error) rejects({status: false, message: "Falla al intentar modificar password"})
                    else resolve({status: true, message: "Password modificada con exito"})
                }
            );
        })


    } else {
        return new Promise((resolve, rejects) => {
            resolve({status: false, message: "Las password no concuerdan"})
        })
    }
}


export const recoveryPassword = function (email) {

    return new Promise((resolve, rejects) => {
        User.findOne({email: email}).then((response) => {
            if (response) {
                UserEmailManager.recovery(email)
                resolve({status: true, message: "Se envio un mail para recuperar tu contraseña"})
            } else rejects({status: false, message: "No se encontro el usuario"})
        }).catch((error) => {
            if (error) rejects({status: false, message: "Fallo interno del servidor "})
        })
    })
}