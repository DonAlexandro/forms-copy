import {useEffect, useState} from 'react'
import {Form, Card, Input, Typography, Button} from 'antd'
import {EditOutlined} from '@ant-design/icons'
import onClickOutside from 'react-onclickoutside'
import {useMutation} from '@apollo/client'

import {useDebounce} from '../../../../hooks/useDebounce'
import {useError} from '../../../../hooks/useError'
import {EDIT_FORM_MUTATION} from '../../../../graphql/mutations/form'

import './FormCard.scss'

const {Title, Text} = Typography

function FormCard({form}) {
	const setError = useError()

	const [editMode, setEditMode] = useState(false)
	const [editFormValue, setEditFormValue] = useState({title: form.title, description: form.description})

	const debouncedEditFormValue = useDebounce(editFormValue, 500)

	FormCard.handleClickOutside = () => setEditMode(false)

	const [editForm] = useMutation(EDIT_FORM_MUTATION, {
		variables: {id: form.id, ...editFormValue},
		onError(err) {
			setError(err)
		}
	})

	const handleFormEdit = (name, value) => {
		setEditFormValue(prev => ({
			...prev,
			[name]: value.trim()
		}))
	}

	useEffect(() => {
		editForm()
	}, [debouncedEditFormValue, editForm])

	return (
		<Card>
			{editMode ? (
				<Form initialValues={editFormValue} onChange={({target: {name, value}}) => handleFormEdit(name, value)}>
					<Form.Item name="title">
						<Input size="large" placeholder="Title" name="title" />
					</Form.Item>
					<Form.Item name="description">
						<Input size="small" placeholder="Description" name="description" />
					</Form.Item>
				</Form>
			) : (
				<>
					<div className="form-header">
						<Title level={2}>{form.title}</Title>
						<Button icon={<EditOutlined />} onClick={() => setEditMode(true)} />
					</div>
					<Text type="secondary">{form.description}</Text>
				</>
			)}
		</Card>
	)
}

const clickOutsideConfig = {
	handleClickOutside: () => FormCard.handleClickOutside
}

export default onClickOutside(FormCard, clickOutsideConfig)
