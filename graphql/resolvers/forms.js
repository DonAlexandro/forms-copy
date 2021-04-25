const { UserInputError } = require("apollo-server-errors")

const Form = require("../../models/Form")
const Question = require("../../models/Question")
const auth = require("../../utils/auth")
const { formValidator } = require("../../utils/validators/form")

module.exports = {
    Query: {
        async getForms(_, args, {req}) {
            const user = auth(req)

            try {
                const forms = await Form.find({author: user.id})

                return forms
            } catch (e) {
                throw new Error('An error occured during forms fetching. Try again later', {e})
            }
        }
    },
    Mutation: {
        async createForm(_, {formInput}, {req}) {
            const user = auth(req)

            const {errors, valid} = formValidator(formInput)

            if (!valid) {
                throw new UserInputError('Form creating errors', {errors})
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
                throw new Error('An error occured during form creating. Try again later', {e})
            }
        },

        async editForm(_, {id, formInput}, {req}) {
            const user = auth(req)

            const {errors, valid} = formValidator(formInput)

            if (!valid) {
                throw new UserInputError('Form editing errors', {errors})
            }

            try {
                const form = await Form.findOne({
                    _id: id,
                    author: user.id
                })

                const toChange = {
                    ...form._doc,
                    ...formInput
                }

                Object.assign(form, toChange)

                await form.save()

                return {
                    ...form._doc,
                    id: form._id
                }
            } catch (e) {
                console.log(e)
                throw new Error('An error occured during form editing. Try again later', {e})
            }
        },

        async deleteForm(_, {id}, {req}) {
            const user = auth(req)

            try {
                await Form.deleteOne({
                    _id: id,
                    author: user.id
                })

                await Question.deleteMany({
                    form: id
                })

                return 'Form was successfully deleted'
            } catch (e) {
                throw new Error('An error occured during form deleting. Try again later', {e})
            }
        }
    }
}