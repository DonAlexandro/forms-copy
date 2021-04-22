const { gql } = require('apollo-server-core')

module.exports = gql`
    type Form {
        id: ID!
        title: String!
        description: String
        color: String!
        author: ID!
        createdAt: String!
    }

    input FormInput {
        title: String!
        description: String
        color: String
    }

    extend type Query {
        getForms: [Form]
    }

    extend type Mutation {
        createForm(formInput: FormInput): Form!
        editForm(id: ID!, formInput: FormInput): Form!
        deleteForm(id: ID!): String!
    }
`