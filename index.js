import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {typeDefs} from './modules/security/graphql/SecuritySchema'
import {resolvers} from './modules/security/graphql/SecurityResolvers'
import {jwtAuth,handleAuthError} from './modules/security/middleware/authMiddleware'


console.log(resolvers)

//Mongo Init
import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/skeleton', {useNewUrlParser: true})

const app = express();
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {user: req.user}
    },
});

//AUTH Middleware
app.use(jwtAuth)
app.use(handleAuthError)

apolloServer.applyMiddleware({app})

app.listen(5000, () => console.log(`Server started :). URL: http://localhost:5000${apolloServer.graphqlPath}`))
