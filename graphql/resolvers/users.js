const {UserInputError} = require('apollo-server-express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const { signupValidator, loginValidator } = require('../../utils/validators/auth')
const keys = require('../../keys')

function generateToken(user) {
    return jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, keys.JWT_KEY, {expiresIn: '1h'})
}

module.exports = {
    Mutation: {
        async signup(_, {signupInput}) {
            let {password} = signupInput

            const {errors, valid} = await signupValidator(signupInput)

            if (!valid) {
                throw new UserInputError('Signup errors', {errors})
            }

            password = await bcrypt.hash(password, 12)

            const user = new User({
                ...signupInput,
                password
            })

            const res = await user.save()

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },

        async login(_, {email, password}) {
            const {errors, valid} = await loginValidator({email, password})

            if (!valid) {
                throw new UserInputError('Login errors', {errors})
            }

            const user = await User.findOne({email})

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}
