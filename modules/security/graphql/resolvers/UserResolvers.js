import {
    createUser,
    updateUser,
    deleteUser,
    findUsers,
    findUser,
    auth,
    changePassword,
    registerUser,
    recoveryPassword
} from '../../services/UserService'

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
        createUser: (_, {input}) => {
            return createUser(input)
        },
        updateUser: (_, {id, input}) => {
            return updateUser(id, input)
        },
        deleteUser: (_, {id}) => {
            return deleteUser(id)
        },
        changePassword: (_, {password, passwordVerify}, {user}) => {
            return changePassword(user.id, {password, passwordVerify})
        },
        registerUser: (_, {input}) => {
            return registerUser(input)
        },
        recoveryPassword: (_, {email}) => {
            return recoveryPassword(email)
        }
    }

}
