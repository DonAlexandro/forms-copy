const { gql } = require('apollo-server-core')

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
    }

    input SignupInput {
        username: String!
        email: String!
        password: String!
        confirm: String!
    }

    extend type Mutation {
        signup(signupInput: SignupInput): User!
        login(email: String!, password: String!): User!
    }
`
