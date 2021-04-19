const userResolvers = require('./users')
const formResolvers = require('./forms')

module.exports = {
    Mutation: {
        ...userResolvers.Mutation,
        ...formResolvers.Mutation
    }
}
