const bcrypt = require('bcrypt')

const User = require('../../models/User')
const { isEmpty, isEmail, min, isMatch, result} = require("./validators")

const errorMessages = {
    usernameEmpty: 'Username must not be empty',
    emailEmpty: 'Email must not be empty',
    emailInvalid: 'Email is invalid',
    emailTaken: 'Email is already taken',
    passwordEmpty: 'Password must not be empty',
    passwordMin: 'Password must contain at least 8 characters',
    passwordMatch: 'Passwords do not match',
    wrongCreds: 'Wrong credentials',
}

/**
 * Validation of a user's registration
 * @param {object} body - object with user's registration data
 * @param {string} body.username - username of a user
 * @param {string} body.email - email of a user
 * @param {string} body.password - password of a user
 * @param {string} body.confirm - the same password just to confirm it
 * @returns {object} - result of the validation
 */
exports.signupValidator = async body => {
    const errors = {}

    if (isEmpty(body.username, {strict: true})) {
        errors.username = errorMessages.usernameEmpty
    }

    if (isEmpty(body.email, {strict: true})) {
        errors.email = errorMessages.emailEmpty
    } else if (!isEmail(body.email)) {
        errors.email = errorMessages.emailInvalid
    } else {
        const user = await User.findOne({email: body.email})

        if (user) {
            errors.email = errorMessages.emailTaken
        }
    }

    if (isEmpty(body.password)) {
        errors.password = errorMessages.passwordEmpty
    } else if (!min(body.password, 8)) {
        errors.password = errorMessages.passwordMin
    } else if (!isMatch(body.password, body.confirm)) {
        errors.password = errorMessages.passwordMatch
    }

    return result(errors)
}

/**
 * Validation of a user's login
 * @param {object} body - object with user's login data
 * @param {string} body.email - email of a user
 * @param {string} body.password - password of a user
 * @returns {object} - result of the validation
 */
exports.loginValidator = async body => {
    const errors = {}

    if (isEmpty(body.email, {strict: true})) {
        errors.email = errorMessages.emailEmpty
    } else if (!isEmail(body.email)) {
        errors.email = errorMessages.emailInvalid
    } else {
        const user = await User.findOne({email: body.email})

        if (!user) {
            errors.email = errorMessages.wrongCreds
        }
    }

    if (isEmpty(body.password)) {
        errors.password = errorMessages.passwordEmpty
    } else if (!min(body.password, 8)) {
        errors.password = errorMessages.passwordMin
    } else {
        const user = await User.findOne({email: body.email}) || {}

        const isSame = await bcrypt.compare(body.password, user.password || '')

        if (!isSame) {
            errors.password = errorMessages.wrongCreds
        }
    }

    return result(errors)
}
