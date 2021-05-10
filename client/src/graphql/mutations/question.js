import {gql} from '@apollo/client'

export const CREATE_QUESTION_MUTATION = gql`
	mutation createQuestion(
		$title: String!
		$description: String
		$required: Boolean
		$type: String
		$answers: [AnswerInput]!
		$form: String!
	) {
		createQuestion(
			questionInput: {
				title: $title
				description: $description
				required: $required
				type: $type
				answers: $answers
				form: $form
			}
		) {
			title
			description
			required
			type
			answers {
				id
				body
				correct
			}
			id
		}
	}
`

export const EDIT_QUESTION_MUTATION = gql`
	mutation editQuestion(
		$id: ID!
		$title: String!
		$description: String
		$required: Boolean
		$type: String!
		$answers: [AnswerInput]!
		$form: String!
	) {
		editQuestion(
			id: $id
			questionInput: {
				title: $title
				description: $description
				required: $required
				type: $type
				answers: $answers
				form: $form
			}
		) {
			id
			title
			description
			type
			answers {
				body
				correct
			}
			form
			required
		}
	}
`

export const DELETE_QUESTION_MUTATION = gql`
	mutation deleteQuestion($id: ID!) {
		deleteQuestion(id: $id)
	}
`
