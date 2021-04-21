const {gql} = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
    },

    type Answer {
        id: ID!
        body: String!
        correct: Boolean
    }

    type Form {
        id: ID!
        title: String!
        description: String
        color: String!
        author: ID!
        createdAt: String!
    },

    type Question {
        id: ID!
        title: String!
        type: String!
        description: String
        required: Boolean!
        form: String!    
        answers: [Answer]!
        createdAt: String!  
    }

    input SignupInput {
        username: String!
        email: String!
        password: String!
        confirm: String!
    }

    input AnswerInput {
        body: String!
        correct: Boolean
    }

    input QuestionInput {
        title: String!
        description: String
        required: Boolean
        type: String
        answers: [AnswerInput]!
        form: String!
    }

    input FormInput {
        title: String!
        description: String
        color: String
    }

    type Query {
        getForms: [Form]
    }

    type Mutation {
        signup(signupInput: SignupInput): User!
        login(email: String!, password: String!): User!
        createForm(formInput: FormInput): Form!
        editForm(id: ID!, formInput: FormInput): Form!
        deleteForm(id: ID!): String!
        createQuestion(questionInput: QuestionInput): Question!
        editQuestion(id: ID!, questionInput: QuestionInput): Question!
    }
`
