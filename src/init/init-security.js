const {createRole} = require('../modules/security/services/RoleService')
const {createUser} = require('../modules/security/services/UserService')


export const initSecurity = function () {

    createRole({name: "user", permissions: []})
    createRole({
        name: "admin",
        permissions: ["SECURITY-ADMIN-CREATE", "SECURITY-ADMIN-UPDATE", "SECURITY-ADMIN-DELETE"]
    }).then(role => {

        createUser({
            username: "admin",
            password: "123",
            name: "Administrador",
            email: "cristian.cdi@gmail.com",
            phone: "1133126919",
            role: role.id,
            active: true
        }).then(i => {
            process.exit();
        })
    })

}
