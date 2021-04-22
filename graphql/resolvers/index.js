const userResolvers = require('./users')
const formResolvers = require('./forms')
const questionResolvers = require('./questions')

module.exports = {
    Query: {
        ...formResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...formResolvers.Mutation,
        ...questionResolvers.Mutation
    }
}
