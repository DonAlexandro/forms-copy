import {gql} from 'graphql-tag'

export const FORM_QUERY = gql`
	query($id: ID!) {
		getForm(id: $id) {
			id
			title
			description
			createdAt
			color
		}
	}
`

export const FORMS_QUERY = gql`
	{
		getForms {
			id
			title
			description
			createdAt
			color
		}
	}
`
