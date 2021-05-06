import {useEffect, useState} from 'react'
import {PageHeader} from 'antd'
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/client'

import ColorPicker from '../ColorPicker'
import {EDIT_FORM_MUTATION} from '../../../../graphql/mutations/form'

const Header = ({form}) => {
	const history = useHistory()

	const [color, setColor] = useState(form.color)

	const [editForm] = useMutation(EDIT_FORM_MUTATION, {
		variables: {...form, color}
	})

	useEffect(() => {
		editForm()
	}, [color, editForm])

	return (
		<PageHeader
			className="page-header"
			title={form.title}
			subTitle={form.description || 'Description'}
			onBack={() => history.push('/')}
			extra={[<ColorPicker key="color" currentColor={form.color} setColor={setColor} />]}
		/>
	)
}

export default Header
