import express from 'express';
import {} from './mongo-db'
import {ApolloServer} from 'apollo-server-express'
import {resolvers, typeDefs} from './modules-merge'
import {jwtAuth, handleAuthError} from './modules/security/middleware/authMiddleware'
import corsMiddleware from "./modules/security/middleware/corsMiddleware";
import rbacMiddleware from "./modules/security/middleware/rbacMiddleware";
import {errorLogger, requestLogger, graphqlLogger, logger} from './logger'

const app = express();


//CORS Middleware
app.use(corsMiddleware)

//AUTH Middleware
app.use(jwtAuth)
app.use(handleAuthError)

//RBAC Middleware
app.use(rbacMiddleware)

//Logger
app.use(errorLogger)
app.use(requestLogger)


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {user: req.user, rbac: req.rbac}
    },
    formatError: (err) => {
        logger.error(err)
        return err;
    },
    formatResponse: (response) => {
        graphqlLogger.info(response);
        return response;
    },
});

apolloServer.applyMiddleware({app})

//STATIC IMG
app.use('/media/avatar', express.static(__dirname + '/media/avatar'));

app.listen(5000, () => console.log(`Server started :). URL: http://localhost:5000${apolloServer.graphqlPath}`))
