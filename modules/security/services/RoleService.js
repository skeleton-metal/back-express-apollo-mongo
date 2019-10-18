import {Role} from './../models/Role'


export const createRole = function ({name, permissions}) {
    const newRole = new Role({
        name,
        permissions
    })
    newRole.id = newRole._id;
    return new Promise((resolve, rejects) => {
        newRole.save((error => {
            error ? rejects(error) : resolve(newRole)
        }))
    })
}

export const findRoles = function () {
    return new Promise((resolve, reject) => {
        Role.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findRole = function (id) {
    return new Promise((resolve, reject) => {
        Role.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findRoleByName = function (roleName) {
    return new Promise((resolve, reject) => {
        Role.findOne({name: roleName}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}