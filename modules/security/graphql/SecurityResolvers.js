import {userResolvers} from './resolvers/UserResolvers'
import {roleResolvers} from './resolvers/RoleResolvers'

export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...roleResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...roleResolvers.Mutation
    }
}