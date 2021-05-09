import {gql} from '@apollo/client'

export const CREATE_FORM_MUTATION = gql`
	mutation createForm($title: String!, $description: String, $color: String) {
		createForm(formInput: {title: $title, description: $description, color: $color}) {
			id
			title
			description
			color
		}
	}
`

export const EDIT_FORM_MUTATION = gql`
	mutation editForm($id: ID!, $title: String!, $description: String, $color: String) {
		editForm(id: $id, formInput: {title: $title, description: $description, color: $color}) {
			id
			title
			description
			color
		}
	}
`

export const DELETE_FORM_MUTATION = gql`
	mutation deleteForm($id: ID!) {
		deleteForm(id: $id)
	}
`
