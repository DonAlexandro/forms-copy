const {gql} = require('apollo-server-express')

const forms = require('./forms')
const users = require('./users')
const questions = require('./questions')

const root = gql`
    type Query {
        root: String!
    }

    type Mutation {
        root: String!
    }
`

module.exports = [root, forms, users, questions]
