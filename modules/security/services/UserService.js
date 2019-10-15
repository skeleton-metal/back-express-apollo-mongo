import {User} from './../models/User'
import bcryptjs from 'bcryptjs'
const jsonwebtoken = require('jsonwebtoken')

export const auth = function ({username, password}) {
    return new Promise((resolve, reject) => {
        findUserByUsername(username).then(user => {
            if (!user) {
                throw new Error('No user with that username/email')
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
                    throw new Error('Incorrect password')
                }
            }
        })

    })

}

export const createUser = function ({username, password, name, email, phone, roles, active}) {
    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashPassword,
        name,
        phone,
        roles: roles,
        active,
        createdAt: Date.now()

    })
    newUser.id = newUser._id;

    return new Promise((resolve, rejects) => {
        newUser.save((error => {
            error ? rejects(error) : resolve(newUser)
        }))
    })
}


export const updateUser = function (id, {username, name, email, phone, roles, active}) {
    let updatedAt = Date.now()
    return new Promise((resolve, rejects) => {
        User.findOneAndUpdate(
            {_id: id}, {username, name, email, phone, roles, active,updatedAt}, {new: true},
            (error, user) => {
                if (error) rejects(error)
                else resolve(user)
            }
        );
    })
}

export const deleteUser = function (id) {
    return new Promise((resolve, rejects) => {
        User.remove(
            {_id: id},{},
            (error, user) => {
                if (error) rejects(error)
                else resolve(true)
            }
        );
    })
}


export const findUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findUserByUsername = function (id) {
    return new Promise((resolve, reject) => {
        User.findOne({username: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}