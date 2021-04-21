const userResolvers = require('./users')
const formResolvers = require('./forms')

module.exports = {
    Query: {
        ...formResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...formResolvers.Mutation
    }
}
