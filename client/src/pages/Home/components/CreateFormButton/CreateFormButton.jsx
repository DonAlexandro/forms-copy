import {Button, message} from 'antd'
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/client'

import {CREATE_FORM_MUTATION} from '../../../../graphql/mutations/form'
import {FORMS_QUERY} from '../../../../graphql/queries/form'

const CreateFormButton = () => {
	const history = useHistory()

	const [createForm, {loading}] = useMutation(CREATE_FORM_MUTATION, {
		update(proxy, {data: {createForm: form}}) {
			history.push(`/form/${form.id}`)

			let data = proxy.readQuery({
				query: FORMS_QUERY
			})

			data = {getForms: [...data.getForms, form]}
			proxy.writeQuery({query: FORMS_QUERY, data})
		},
		onError(err) {
			message.error(Object.values(err.graphQLErrors[0].extensions.errors)[0])
		},
		variables: {title: 'New Form'}
	})

	return (
		<Button type="primary" loading={loading} onClick={createForm}>
			New Form
		</Button>
	)
}

export default CreateFormButton
