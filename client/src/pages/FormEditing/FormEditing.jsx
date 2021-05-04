import {message, Card, Form, Input} from 'antd'
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
						<Container>
							<Card>
								<Form>
									<Form.Item name="title">
										<Input size="large" placeholder="Title" defaultValue={form.title} />
									</Form.Item>
									<Form.Item name="description">
										<Input size="small" placeholder="Description" defaultValue={form.description} />
									</Form.Item>
								</Form>
							</Card>
						</Container>
					</div>
				</>
			)}
		</MainLayout>
	)
}

export default FormEditing
