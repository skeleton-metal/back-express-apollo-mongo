import express from 'express';
import {} from './mongo-db'
import {ApolloServer} from 'apollo-server-express'
import {resolvers, typeDefs} from './modules-merge'
import {jwtAuth, handleAuthError} from './modules/security/middleware/authMiddleware'
import corsMiddleware from "./modules/security/middleware/corsMiddleware";
import rbacMiddleware from "./modules/security/middleware/rbacMiddleware";
import {expressRequestLogger, graphqlErrorLogger, graphqlResponseLogger} from './logger'

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

//EXPRESS LOGGER
app.use(expressRequestLogger)

//PLAY
app.use(function(req,res,next){
  //  console.log(req.body)
    next()
})

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {user: req.user, rbac: req.rbac}
    },
    formatError: (err) => {
        graphqlErrorLogger.error(err)
        return err;
    },
    formatResponse: (response) => {
        graphqlResponseLogger.info(response);
        return response;
    },
});

apolloServer.applyMiddleware({app})

//STATIC IMG
app.use('/media/avatar', express.static(__dirname + '/media/avatar'));

app.listen(5000, () => console.log(`Server started :). URL: http://localhost:5000${apolloServer.graphqlPath}`))
