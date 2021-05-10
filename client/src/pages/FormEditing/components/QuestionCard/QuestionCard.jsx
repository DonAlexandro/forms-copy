import {useEffect, useRef, useState} from 'react'
import {
	Row,
	Col,
	Card,
	Form,
	Input,
	Select,
	Typography,
	Button,
	List,
	Divider,
	Space,
	Switch,
	Tooltip,
	message,
	Radio
} from 'antd'
import {PlusCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom'

import {useClickOutside} from '../../../../hooks/useClickOutside'
import {useDebounce} from '../../../../hooks/useDebounce'
import {DELETE_QUESTION_MUTATION, EDIT_QUESTION_MUTATION} from '../../../../graphql/mutations/question'
import {GET_QUESTIONS_QUERY} from '../../../../graphql/queries/question'

import './QuestionCard.scss'

const {Text, Title} = Typography
const {Option} = Select

const QuestionCard = ({question}) => {
	const history = useHistory()

	// Outside clicking functional
	const ref = useRef(null)
	useClickOutside(ref, () => setEditMode(false))

	const [editMode, setEditMode] = useState(false)

	// Switcher whether to show description
	const [showDescription, setShowDescription] = useState(false)

	// Debouncing and editing question values
	const [editQuestionValue, setEditQuestionValue] = useState({
		title: question.title,
		description: question.description,
		type: question.type,
		required: question.required
	})

	const [answers, setAnswers] = useState(question.answers)

	const handleEditQuestion = (name, value) => {
		setEditQuestionValue(prev => ({
			...prev,
			[name]: value
		}))
	}

	const debouncedQuestionValue = useDebounce(editQuestionValue, 500)

	const [editQuestion, {loading: editLoading}] = useMutation(EDIT_QUESTION_MUTATION, {
		variables: {
			id: question.id,
			form: question.form,
			...editQuestionValue,
			answers: answers.map(a => ({body: a.body, correct: a.borrect}))
		},
		onError(err) {
			if (err.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
				message.error(err.graphQLErrors[0].message)
				history.push('/login')
			} else {
				message.error(Object.values(err.graphQLErrors[0].extensions.errors)[0])
			}
		}
	})

	useEffect(() => {
		editQuestion()
	}, [debouncedQuestionValue, editQuestion, answers])

	// Delete question mutation
	const [deleteQuestion, {loading}] = useMutation(DELETE_QUESTION_MUTATION, {
		variables: {id: question.id},
		update(proxy) {
			let data = proxy.readQuery({query: GET_QUESTIONS_QUERY, variables: {formId: question.form}})

			data = {getQuestions: data.getQuestions.filter(q => q.id !== question.id)}

			proxy.writeQuery({query: GET_QUESTIONS_QUERY, variables: {formId: question.form}, data})
		}
	})

	return (
		<div ref={ref}>
			<Card className="question-card">
				{editMode ? (
					<>
						<Form
							initialValues={editQuestionValue}
							onChange={({target: {name, value}}) => handleEditQuestion(name, value)}
						>
							<Row gutter={[20]}>
								<Col md={12}>
									<Form.Item name="title">
										<Input size="large" placeholder="Question" name="title" />
									</Form.Item>
								</Col>
								<Col md={12}>
									<Form.Item name="type">
										<Radio.Group
											className="question-type"
											buttonStyle="solid"
											size="large"
											onChange={({target: {value}}) => handleEditQuestion('type', value)}
										>
											<Radio.Button value="quiz">Quiz</Radio.Button>
											<Radio.Button value="text">Text</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</Col>
								{showDescription || editQuestionValue.description ? (
									<Col md={24}>
										<Form.Item name="description">
											<Input size="small" placeholder="Description" name="description" />
										</Form.Item>
									</Col>
								) : (
									<></>
								)}
							</Row>
						</Form>
						{editQuestionValue.type === 'quiz' ? (
							<List
								loadMore={
									<Button
										onClick={() => setAnswers(prev => [...prev, {body: 'Answer', correct: false}])}
										icon={<PlusCircleOutlined />}
									>
										New Question
									</Button>
								}
							>
								{question.answers.map(answer => (
									<List.Item key={answer.id}>
										<Text editable>{answer.body}</Text>
									</List.Item>
								))}
							</List>
						) : (
							<Input.TextArea readOnly placeholder="Detailed answer" autoSize />
						)}
						<Divider />
						<div className="actions">
							<Space>
								<Switch
									checkedChildren="required"
									unCheckedChildren="required"
									checked={editQuestionValue.required}
									onChange={checked => handleEditQuestion('required', checked)}
								/>
								<Switch
									checkedChildren="description"
									unCheckedChildren="description"
									checked={showDescription || !!editQuestionValue.description}
									onChange={checked => {
										setShowDescription(checked)
										handleEditQuestion('description', null)
									}}
								/>
							</Space>
							<Divider type="vertical" />
							<Tooltip title="Delete">
								<Button icon={<DeleteOutlined />} onClick={deleteQuestion} loading={loading} />
							</Tooltip>
						</div>
					</>
				) : (
					<>
						<div className="question-header">
							<Title level={4}>
								{question.title}
								&nbsp;
								<Text type="danger">{editQuestionValue.required && '*'}</Text>
							</Title>
							<Button icon={<EditOutlined />} onClick={() => setEditMode(true)} />
						</div>
						{question.description && <Text type="secondary">{question.description}</Text>}
						{question.type === 'quiz' ? (
							<List>
								{question.answers.map(answer => (
									<List.Item key={answer.id}>
										<List.Item.Meta
											className="answer"
											title={answer.body}
											avatar={<Radio disabled />}
										/>
									</List.Item>
								))}
							</List>
						) : (
							<Input.TextArea
								readOnly
								placeholder="Detailed answer"
								autoSize
								className="detailed-input"
							/>
						)}
					</>
				)}
			</Card>
		</div>
	)
}

export default QuestionCard
