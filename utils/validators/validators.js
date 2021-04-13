const User = require("../../models/User")

/**
 * Checks emptieness of string
 * @param {string} value - some string 
 * @param {object} [options] - validation's options 
 * @param {boolean} [options.strict] - if provided, validator checks whether value is empty with trim function
 * @returns {boolean} - whether string is empty or not
 */
exports.isEmpty = (value, options = {}) => {
    if (options.strict) {
        return value.trim() === ''
    } 

    return value === ''
}

/**
 * Checks whether email is valid
 * @param {string} email - user's email
 * @returns {boolean} - weather string is valid email
 */
exports.isEmail = email => /.+@.+\..+/.test(email)

/**
 * Checks whether two provided string is matching
 * @param {string} value1 - some string #1
 * @param {string} value2 - some string #2
 * @returns {boolean} - weather first value equals second value
 */
exports.isMatch = (value1, value2) => value1 === value2

/**
 * Checks whether provided value has at least provided length of the characters
 * @param {string} value - some string
 * @param {number} length - expected minimal length of the value
 * @returns {boolean} - weather the length of provided value equals or bigger then the provided length
 */
exports.min = (value, length) => value.length >= length

/**
 * Common function for all validators to return one result
 * @param {object} errors - object with errors from validator 
 * @returns {object} - objects with provided errors and valid condition
 */
exports.result = errors => ({
    errors,
    valid: Object.keys(errors) < 1
})
