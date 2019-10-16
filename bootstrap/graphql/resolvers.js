import {messageResolvers} from './resolvers/MessageResolvers'

export const resolvers = {
    Query: {
        ...messageResolvers.Query,
    },
    Mutation: {
        ...messageResolvers.Mutation,
    }
}