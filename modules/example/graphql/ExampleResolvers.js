import {messageResolvers} from './resolvers/MessageResolvers'

export const exampleResolvers = {
    Query: {
        ...messageResolvers.Query,
    },
    Mutation: {
        ...messageResolvers.Mutation,
    }
}