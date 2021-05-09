const {UserInputError} = require('apollo-server-errors')

const auth = require('../../utils/auth')
const {questionValidator} = require('../../utils/validators/question')
const Question = require('../../models/Question')

module.exports = {
	Query: {
		async getQuestions(_, {formId}, {req}) {
			auth(req)

			try {
				const questions = await Question.find({
					form: formId
				})

				return questions
			} catch (e) {
				throw new Error('An error occured during questions fetching. Try again later', {e})
			}
		}
	},

	Mutation: {
		async createQuestion(_, {questionInput}, {req}) {
			auth(req)

			const {errors, valid} = questionValidator(questionInput)

			if (!valid) {
				throw new UserInputError('Question creating erros', {errors})
			}

			try {
				const question = new Question(questionInput)

				const res = await question.save()

				return {
					...res._doc,
					id: res._id
				}
			} catch (e) {
				throw new Error('An error occured during question creating. Try again later', {e})
			}
		},

		async editQuestion(_, {id, questionInput}, {req}) {
			auth(req)

			const {errors, valid} = questionValidator(questionInput)

			if (!valid) {
				throw new UserInputError('Question editing errors', {errors})
			}

			try {
				const {form} = questionInput

				const question = await Question.findOne({_id: id, form})

				const toChange = {
					...question._doc,
					...questionInput
				}

				Object.assign(question, toChange)

				await question.save()

				return {
					...question._doc,
					id: question._id
				}
			} catch (e) {
				throw new Error('An error occured during question editing. Try again later', {e})
			}
		},

		async deleteQuestion(_, {id}, {req}) {
			auth(req)

			try {
				await Question.deleteOne({_id: id})
			} catch (e) {
				throw new Error('An error occured during question deleting. Try again later', {e})
			}
		}
	}
}
