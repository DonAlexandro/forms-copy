const { isEmpty, result } = require("./validators")

/**
 * Form validator
 * @param {object} body - data of the form, created by user
 * @param {string} body.title - title of the form
 * @param {string} [body.description] - description of the form
 * @param {string} [body.color] - color of the form
 */
exports.formValidator = body => {
    const errors = {}
    const {title} = body

    if (isEmpty(title, {strict: true})) {
        errors.title = 'Title of the form must not be empty'
    }

    return result(errors)
}