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
    avatarUpload,
    activationUser, paginateUsers
} from '../../services/UserService'
import {AuthenticationError, ForbiddenError} from "apollo-server-express";
import {SECURITY_USER_CREATE, SECURITY_USER_DELETE, SECURITY_USER_EDIT, SECURITY_USER_SHOW} from "../../permissions";

export default {
    Query: {
        users: (_,{}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_SHOW)) throw new ForbiddenError("Not Authorized")
            return findUsers()
        },
        user: (_, {id}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_SHOW)) throw new ForbiddenError("Not Authorized")
            return findUser(id)
        },
        me: (_, {}, {user}) => {
            return findUser(user.id)
        },
        paginateUsers: (_, {limit, pageNumber, search, orderBy, orderDesc}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateUsers(limit, pageNumber, search, orderBy, orderDesc)
        },
    },
    Mutation: {
        auth: (_, {username, password}, {req}) => {
            return auth({username, password},req)
        },
        createUser: (_, {input}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_CREATE)) throw new ForbiddenError("Not Authorized")
            return createUser(input)
        },
        updateUser: (_, {id, input}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_EDIT)) throw new ForbiddenError("Not Authorized")
            return updateUser(id, input)
        },
        deleteUser: (_, {id}, {user, rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteUser(id)
        },
        adminChangePassword: (_, {id, password, passwordVerify}, {user,rbac}) => {
            if (!user || !rbac.isAllowed(user.id, SECURITY_USER_EDIT)) throw new ForbiddenError("Not Authorized")
            return changePassword(id, {password, passwordVerify})
        },
        changePassword: (_, {password, passwordVerify}, {user}) => {
            if (!user) throw new AuthenticationError("Usuario no autenticado")
            return changePassword(user.id, {password, passwordVerify})
        },
        registerUser: (_, {input}) => {
            return registerUser(input)
        },
        recoveryPassword: (_, {email}) => {
            return recoveryPassword(email)
        },
        avatarUpload: (_, {file}, {user}) => {
            if (!user) throw new AuthenticationError("Usuario no autenticado")
            return avatarUpload(user, file)
        },
        activationUser: (_, {id}) => {
            return activationUser(id)
        }
    }

}
