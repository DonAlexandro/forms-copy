const jwt = require('jsonwebtoken')
const { AuthenticationError } = require("apollo-server-errors")

const keys = require('../keys')

const invalidTokenMessage = 'Authentication token is invalid or expired'

module.exports = request => {
    try {
        const token = request.headers.authorization.split('Bearer ')[1]

        if (!token) {
            throw new AuthenticationError(invalidTokenMessage)
        }

        const user = jwt.verify(token, keys.JWT_KEY)

        return user
    } catch (e) {
        throw new AuthenticationError(invalidTokenMessage)
    }
}
