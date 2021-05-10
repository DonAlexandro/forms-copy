import {gql} from '@apollo/client'

export const GET_QUESTIONS_QUERY = gql`
	query($formId: ID!) {
		getQuestions(formId: $formId) {
			id
			title
			description
			type
			answers {
				id
				body
				correct
			}
			required
			form
		}
	}
`
