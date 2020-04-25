import {createRole, findRoleByName} from './RoleService'
import {createUser, findUserByUsername} from './UserService'
import {ROLES, INIT_USER_ADMIN} from '../consts'

function checkOrCreateRoleAdmin() {

    return new Promise((resolve, reject) => {

        findRoleByName(ROLES.ADMIN.NAME).then(role => {
            if (!role) {
                createRole({name: ROLES.ADMIN.NAME, permissions: ROLES.ADMIN.PERMISSIONS}).then(newRole => {
                    console.log("RoleModel admin created: ", newRole.id)
                    resolve(newRole)
                })
            } else {
                console.log("RoleModel admin found: ", role.id)
                resolve(role)
            }
        }).catch(err => reject(err))

    })

}

function checkOrCreateRoleOperator() {
    findRoleByName(ROLES.OPERATOR.NAME).then(roleUser => {
        if (!roleUser) {
            createRole({name: ROLES.OPERATOR.NAME, permissions: ROLES.OPERATOR.PERMISSIONS})
                .then(roleUserNew => console.log("RoleModel operator created: ", roleUserNew.id))
                .catch(err => console.error(err))
        } else {
            console.log("RoleModel user found: ", roleUser.id)
        }
    })
}

export const initSecurity = async function () {

    //User ROLE
    await checkOrCreateRoleOperator();

    //Admin ROLE
    let roleAdmin = await checkOrCreateRoleAdmin()
    let user = await findUserByUsername(INIT_USER_ADMIN.username)

    if (!user) {
        user = await createUser({...INIT_USER_ADMIN, role: roleAdmin.id})
        console.log("User root created: ", user.id)

    } else {
        console.log("User root found: ", user.id)
    }


}


