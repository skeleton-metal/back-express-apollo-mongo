import {userResolvers} from './resolvers/UserResolvers'
import {roleResolvers} from './resolvers/RoleResolvers'

export const securityResolvers = {
    Query: {
        ...userResolvers.Query,
        ...roleResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...roleResolvers.Mutation
    }
}