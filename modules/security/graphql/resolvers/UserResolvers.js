import {createUser, updateUser, deleteUser, findUsers, findUser, auth} from '../../services/UserService'

export const userResolvers = {
    Query: {
        users: () => {
            return findUsers()
        },
        user: (_, {id}) => {
            return findUser(id)
        },
        me: (_, input, {user}) => {
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
    }

}
