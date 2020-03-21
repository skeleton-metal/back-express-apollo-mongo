import {createRole, findRoleByName} from './RoleService'
import {createUser, findUserByUsername} from './UserService'
import {PERMISIONS, INIT_USER_ADMIN} from '../consts'

function checkOrCreateRoleAdmin() {

    return new Promise((resolve, reject) => {

        findRoleByName("admin").then(role => {
            if (!role) {
                createRole({name: "admin", permissions: PERMISIONS.ADMIN}).then(newRole => {
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

function checkOrCreateRoleUser() {
    findRoleByName("user").then(roleUser => {
        if (!roleUser) {
            createRole({name: "user", permissions: PERMISIONS.USER})
                .then(roleUserNew => console.log("Role user created: ", roleUserNew.id))
                .catch(err => console.error(err))
        } else {
            console.log("Role user found: ", roleUser.id)
        }
    })
}

export const initSecurity = function () {

    //User ROLE
    checkOrCreateRoleUser();

    //Admin ROLE
    checkOrCreateRoleAdmin().then(role => {
        findUserByUsername("root").then(user => {
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
