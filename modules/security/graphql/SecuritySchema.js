import {importSchema} from 'graphql-import'
const typeDefs = importSchema('modules/security/graphql/types/AllTypes.graphql');
export {typeDefs};