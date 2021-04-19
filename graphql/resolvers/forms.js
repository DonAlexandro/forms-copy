const { UserInputError } = require("apollo-server-errors")

const Form = require("../../models/Form")
const auth = require("../../utils/auth")
const { formValidator } = require("../../utils/validators/form")

module.exports = {
    Mutation: {
        async createForm(_, {formInput}, {req}) {
            const user = auth(req)

            const {errors, valid} = formValidator(formInput)

            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }

            try {
                const form = new Form({
                    ...formInput,
                    author: user.id
                })

                const res = await form.save()

                return {
                    ...res._doc,
                    id: res._id
                }
            } catch (e) {
                throw new Error('Server Error', {e})
            }
        }
    }
}