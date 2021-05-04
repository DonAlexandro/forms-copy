import {Button, message} from 'antd'
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/client'

import {CREATE_FORM_MUTATION} from '../../../../graphql/mutations/form'

const CreateFormButton = () => {
	const history = useHistory()

	const [createForm, {loading}] = useMutation(CREATE_FORM_MUTATION, {
		update(_, {data: {createForm: form}}) {
			history.push(`/form/${form.id}`)
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
