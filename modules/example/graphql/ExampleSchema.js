import {importSchema} from 'graphql-import'
const typeDefs = importSchema('modules/example/graphql/types/MessageTypes.graphql');
export {typeDefs};