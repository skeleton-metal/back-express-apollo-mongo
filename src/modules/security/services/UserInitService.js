import {createRole, findRoleByName} from './RoleService'
import {createUser, findUserByUsername} from './UserService'
import {ROLES, INIT_USER_ADMIN} from '../consts'

function checkOrCreateRoleAdmin() {

    return new Promise((resolve, reject) => {

        findRoleByName(ROLES.ADMIN.NAME).then(role => {
            if (!role) {
                createRole({name: ROLES.ADMIN.NAME, permissions: ROLES.ADMIN.PERMISSIONS}).then(newRole => {
                    console.log("Role admin created: ", newRole.id)
                    resolve(newRole)
                })
            } else {
                console.log("Role admin found: ", role.id)
                resolve(role)
            }
        }).catch(err => reject(err))

    })

}

function checkOrCreateRoleOperator() {
    findRoleByName(ROLES.OPERATOR.NAME).then(roleUser => {
        if (!roleUser) {
            createRole({name: ROLES.OPERATOR.NAME, permissions: ROLES.OPERATOR.PERMISSIONS})
                .then(roleUserNew => console.log("Role operator created: ", roleUserNew.id))
                .catch(err => console.error(err))
        } else {
            console.log("Role user found: ", roleUser.id)
        }
    })
}

export const initSecurity = function () {

    //User ROLE
    checkOrCreateRoleOperator();

    //Admin ROLE
    checkOrCreateRoleAdmin().then(role => {
        findUserByUsername(INIT_USER_ADMIN.username).then(user => {
            if (!user) {
                createUser({...INIT_USER_ADMIN, role: role.id}).then(userNew => {
                    console.log("User root created: ", userNew.id)
                    process.exit()
                })
            } else {
                console.log("User root found: ", user.id)
                process.exit()
            }
        }).catch(err => console.error(err))

    })

}
