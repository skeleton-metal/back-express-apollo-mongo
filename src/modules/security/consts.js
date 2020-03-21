export const PERMISIONS = {
    USER: [],
    ADMIN: ["SECURITY-ADMIN-CREATE", "SECURITY-ADMIN-UPDATE", "SECURITY-ADMIN-DELETE"]
}

export const ROLES = {
    ADMIN: {
        NAME: "admin",
        PERMISSIONS: ["SECURITY-ADMIN-CREATE", "SECURITY-ADMIN-UPDATE", "SECURITY-ADMIN-DELETE"]
    },
    OPERATOR: {
        NAME: "operator",
        PERMISSIONS: []
    }
}


export const INIT_USER_ADMIN = {
    username: "root",
    password: "root.123",
    name: "Administrador",
    email: "cristian.cdi@gmail.com",
    phone: "1133126919",
    active: true

}
