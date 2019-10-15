import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {typeDefs} from './modules/security/graphql/SecuritySchema'
import {resolvers} from './modules/security/graphql/SecurityResolvers'
import {jwtAuth,handleAuthError} from './modules/security/middleware/authMiddleware'


console.log(resolvers)

//Mongo Init
import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://skeleton:123@127.0.0.1:27017/skeleton', {useNewUrlParser: true})

const app = express();


//AUTH Middleware
app.use(jwtAuth)
app.use(handleAuthError)

app.use((req,resp,next) => {
   // console.log(JSON.stringify(req.headers))
    next()
})

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {user: req.user}
    },
});

apolloServer.applyMiddleware({app})

app.listen(5000, () => console.log(`Server started :). URL: http://localhost:5000${apolloServer.graphqlPath}`))
