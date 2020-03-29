import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas';

//RESOLVERS
import {securityResolvers} from './modules/security/graphql'
import {resolvers as customizationResolvers } from './modules/customization/graphql'

export const resolvers = mergeResolvers([securityResolvers, customizationResolvers])

//TYPEDEFS
import {securityTypes} from './modules/security/graphql'
import {types as customizationTypes} from './modules/customization/graphql'

export const typeDefs = mergeTypes([securityTypes, customizationTypes])
