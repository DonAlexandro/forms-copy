import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'

import Header from './components/Header'
import MainLayout from '../../layouts/Main'
import Preloader from '../../components/Preloader'
import Container from '../../components/Container'
import QuestionCard from './components/QuestionCard'
import AddQuestion from './components/AddQuestion'
import FormCard from './components/FormCard/FormCard'
import {useError} from '../../hooks/useError'
import {FORM_QUERY} from '../../graphql/queries/form'
import {GET_QUESTIONS_QUERY} from '../../graphql/queries/question'

import './FormEditing.scss'

const FormEditing = () => {
	const {id} = useParams()
	const setError = useError()

	const {loading: formLoading, data: {getForm: form} = {}} = useQuery(FORM_QUERY, {
		variables: {id},
		onError(err) {
			setError(err)
		}
	})

	const {loading: questionsLoading, data: {getQuestions: questions} = {}} = useQuery(GET_QUESTIONS_QUERY, {
		variables: {formId: id}
	})

	return (
		<MainLayout>
			{formLoading || questionsLoading ? (
				<Preloader />
			) : (
				<>
					<Header form={form} />
					<div className="form-wrapper" style={{backgroundColor: form.color}}>
						<Container size="medium">
							<FormCard form={form} />
							{questions.map(question => (
								<QuestionCard key={question.id} question={question} />
							))}
							<AddQuestion formId={id} />
						</Container>
					</div>
				</>
			)}
		</MainLayout>
	)
}

export default FormEditing
