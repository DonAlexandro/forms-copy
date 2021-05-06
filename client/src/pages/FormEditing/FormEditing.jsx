import {message, Card, Form, Input, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {useParams, useHistory} from 'react-router-dom'
import {useQuery} from '@apollo/client'

import Header from './components/Header'
import MainLayout from '../../layouts/Main'
import {FORM_QUERY} from '../../graphql/queries/form'
import Preloader from '../../components/Preloader'
import Container from '../../components/Container'

import './FormEditing.scss'

const FormEditing = () => {
	const {id} = useParams()
	const history = useHistory()

	const {loading, data: {getForm: form} = {}} = useQuery(FORM_QUERY, {
		variables: {id},
		onError(err) {
			history.push('/')
			message.error(Object.values(err.graphQLErrors[0].extensions.errors)[0])
		}
	})

	return (
		<MainLayout>
			{loading ? (
				<Preloader />
			) : (
				<>
					<Header form={form} />
					<div className="form-wrapper" style={{backgroundColor: form.color}}>
						<Container size="medium">
							<Card>
								<Form initialValues={form}>
									<Form.Item name="title">
										<Input size="large" placeholder="Title" />
									</Form.Item>
									<Form.Item name="description">
										<Input size="small" placeholder="Description" />
									</Form.Item>
								</Form>
							</Card>
							<Button block icon={<PlusOutlined />} className="add-question">
								Add Question
							</Button>
						</Container>
					</div>
				</>
			)}
		</MainLayout>
	)
}

export default FormEditing
