const {gql} = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
        token: String!
    },

    type Form {
        id: ID!,
        title: String!,
        description: String,
        author: User!,
        createdAt: String!
    },

    type Answer {
        id: ID!,
        title: String!
    }

    type Question {
        id: ID!,
        answers: [Answer],
        form: Form!,
        createdAt: String!  
    }

    input SignupInput {
        username: String!,
        email: String!
        password: String!,
        confirm: String!
    }

    type Query {
        getForms: [Form]
    }

    type Mutation {
        signup(signupInput: SignupInput): User!,
        login(email: String!, password: String!): User!
    }
`
