import {
    createUser,
    updateUser,
    deleteUser,
    findUsers,
    findUser,
    auth,
    changePassword,
    registerUser,
    recoveryPassword,
    avatarUpload
} from '../../services/UserService'
import {ForbiddenError, AuthenticationError} from 'apollo-server-express'

export default {
    Query: {
        users: () => {
            return findUsers()
        },
        user: (_, {id}) => {
            return findUser(id)
        },
        me: (_, {}, {user}) => {
            return findUser(user.id)
        }
    },
    Mutation: {
        auth: (_, {username, password}) => {
            return auth({username, password})
        },
        createUser: (_, {input}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, "SECURITY-ADMIN-CREATE")) throw new ForbiddenError("Not Authorized")
            return createUser(input)
        },
        updateUser: (_, {id, input}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateUser(id, input)
        },
        deleteUser: (_, {id}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, "SECURITY-ADMIN-DELETE")) throw new ForbiddenError("Not Authorized")
            return deleteUser(id)
        },
        changePassword: (_, {password, passwordVerify}, {user}) => {
            if(!user) throw new AuthenticationError("Usuario no autenticado")
            return changePassword(user.id, {password, passwordVerify})
        },
        registerUser: (_, {input}) => {
            return registerUser(input)
        },
        recoveryPassword: (_, {email}) => {
            return recoveryPassword(email)
        },
        avatarUpload: (_, {file}, {user}) => {
            return avatarUpload(user, file)
        },
    }

}
