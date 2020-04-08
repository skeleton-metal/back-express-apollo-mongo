import {RoleModel} from '../models/RoleModel'
import * as permissions from '../permissions'

export const findPermissions = function () {
    return new Promise((resolve, reject) => {
        console.log(Object.values(permissions))
        resolve({permissions: Object.values(permissions)})
    })
}

export const createRole = function ({name, permissions}) {
    const newRole = new RoleModel({
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
        RoleModel.find({}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findRole = function (id) {
    return new Promise((resolve, reject) => {
        RoleModel.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

export const findRoleByName = function (roleName) {
    return new Promise((resolve, reject) => {
        RoleModel.findOne({name: roleName}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}
