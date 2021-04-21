const {gql} = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
        token: String!
    },

    type Answer {
        id: ID!,
        title: String!,
        correct: Boolean
    }

    type Form {
        id: ID!,
        title: String!,
        description: String,
        color: String!,
        author: ID!,
        createdAt: String!
    },

    type Question {
        id: ID!,
        title: String!,
        type: String!
        description: String,
        required: Boolean!,
        form: Form!,        
        answers: [Answer],
        createdAt: String!  
    }

    input SignupInput {
        username: String!,
        email: String!
        password: String!,
        confirm: String!
    }

    input AnswerInput {
        title: String!
    }

    input QuestionInput {
        title: String!,
        answers: [AnswerInput]
    }

    input FormInput {
        title: String!,
        description: String,
        color: String
    }

    type Query {
        getForms: [Form]
    }

    type Mutation {
        signup(signupInput: SignupInput): User!,
        login(email: String!, password: String!): User!,
        createForm(formInput: FormInput): Form!,
        editForm(id: ID!, formInput: FormInput): Form!,
        deleteForm(id: ID!): String!
    }
`
