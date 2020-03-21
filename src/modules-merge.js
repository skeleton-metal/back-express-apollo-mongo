import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';

//RESOLVERS
import {securityResolvers} from './modules/security/graphql'
import {exampleResolvers} from './modules/example/graphql'

export const resolvers = mergeResolvers([securityResolvers, exampleResolvers])

//TYPEDEFS
import {securityTypes} from './modules/security/graphql'
import {exampleTypes} from './modules/example/graphql'

export const typeDefs = mergeTypes([securityTypes, exampleTypes])
