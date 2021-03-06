import {Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/client'

import {useError} from '../../../../hooks/useError'
import {CREATE_QUESTION_MUTATION} from '../../../../graphql/mutations/question'
import {GET_QUESTIONS_QUERY} from '../../../../graphql/queries/question'

import './AddQuestion.scss'

const AddQuestion = ({formId}) => {
	const setError = useError()

	const [addQuestion, {loading: addQuestionLoading}] = useMutation(CREATE_QUESTION_MUTATION, {
		variables: {
			title: 'Question',
			answers: [{body: 'Answer 1', correct: false}],
			type: 'quiz',
			form: formId
		},
		update(proxy, {data: {createQuestion: question}}) {
			let data = proxy.readQuery({query: GET_QUESTIONS_QUERY, variables: {formId}})

			data = data.getQuestions ? {getQuestions: [...data.getQuestions, question]} : {getQuestions: [question]}

			proxy.writeQuery({query: GET_QUESTIONS_QUERY, variables: {formId}, data})
		},
		onError(err) {
			setError(err)
		}
	})

	return (
		<Button
			onClick={addQuestion}
			loading={addQuestionLoading}
			block
			icon={<PlusOutlined />}
			className="add-question"
		>
			Add Question
		</Button>
	)
}

export default AddQuestion
