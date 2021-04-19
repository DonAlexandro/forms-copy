const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

const keys = require('./keys')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

async function startApolloServer() {
    try {
        await mongoose.connect(keys.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const server = new ApolloServer({
            resolvers,
            typeDefs,
            context: ({req}) => ({req})
        })
        
        await server.start()

        const app = express()

        app.use(express.urlencoded({extended: true}))
        app.use(express.json({extended: true}))

        server.applyMiddleware({app})

        await new Promise(resolve => app.listen({port: keys.PORT}, resolve))
        console.log(`GraphQL server is running or port ${keys.PORT}`)

        return {server, app}
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

startApolloServer()
