require('dotenv').config();
import express from 'express';
import {} from './mongo-db'
import {ApolloServer, GraphQLExtension} from 'apollo-server-express'
import {resolvers, typeDefs} from './modules-merge'
import {jwtAuth, handleAuthError} from './modules/security/middleware/authMiddleware'
import corsMiddleware from "./modules/security/middleware/corsMiddleware";
import rbacMiddleware from "./modules/security/middleware/rbacMiddleware";
import {expressRequestLogger, graphqlErrorLogger, graphqlResponseLogger} from './logger'
import sessionMiddleware from "./modules/security/middleware/sessionMiddleware";

const app = express();


//CORS Middleware
app.use(corsMiddleware)

//body parse json payload
app.use(express.json());

//AUTH Middleware
app.use(jwtAuth)
app.use(handleAuthError)

//RBAC Middleware
app.use(rbacMiddleware)

//EXPRESS REQUEST LOGGER
app.use(expressRequestLogger)

app.use(sessionMiddleware)


GraphQLExtension.didEncounterErrors

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {user: req.user, rbac: req.rbac}
    },
    plugins: [
        {
            requestDidStart(requestContext) {
                return {
                    didEncounterErrors(requestContext) {
                        graphqlErrorLogger(requestContext)
                    },
                    willSendResponse(requestContext){
                        console.log("willSendResponse")
                        graphqlResponseLogger(requestContext)
                    }
                }
            }
        }
    ]
});



apolloServer.applyMiddleware({app})

//STATIC IMG
app.use('/media/avatar', express.static('media/avatar'));

app.listen(process.env.APP_PORT, () => console.log(`Server started :). URL: http://localhost:${process.env.APP_PORT}${apolloServer.graphqlPath}`))
