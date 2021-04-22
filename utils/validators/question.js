const { result, isEmpty, isMatch } = require("./validators")

/**
 * Question validator
 * @param {obect} body - body of the question 
 * @param {string} body.title - title of the question 
 * @param {string} [body.description] - description of the question 
 * @param {boolean} [body.required] - whether the question is required
 * @param {string} [body.type] - type of the question. Can accept only two values: text or quiz
 * @param {string} body.form - id of a form that include this question
 * @param {Array} body.answers - asnwers to the question. Must contain at least one value
 * @param {Array} body.answers.body - title of the answer
 * @param {Array} [body.answers.correct] - whether the answer is correct
 * @returns {object} - result of the validation with errors and valid checker
 */
exports.questionValidator = body => {
    const errors = {}

    const {title, answers, type} = body

    if (isEmpty(title, {strict: true})) {
        errors.title = 'Title of the question must not be empty'
    }

    if (!isMatch(type, 'quiz') && !isMatch(type, 'text')) {
        errors.type = 'Type of the question must be only "text" or "quiz"'
    }

    if (!answers.length) {
        errors.answers = 'The question should have at least one answer'
    }

    return result(errors)
}