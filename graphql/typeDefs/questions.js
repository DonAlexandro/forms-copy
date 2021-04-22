const { gql } = require('apollo-server-core')

module.exports = gql`
    type Answer {
        id: ID!
        body: String!
        correct: Boolean
    }

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

    extend type Mutation {
        createQuestion(questionInput: QuestionInput): Question!
        editQuestion(id: ID!, questionInput: QuestionInput): Question!
        deleteQuestion(id: ID!): String
    }
`