import {useState} from 'react'
import {Row, Col, Card, Form, Input, Select, Typography, Button, List, Divider, Space, Switch, Tooltip} from 'antd'
import {PlusCircleOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons'
import onClickOutside from 'react-onclickoutside'

import './QuestionCard.scss'

const {Text, Title} = Typography
const {Option} = Select

function QuestionCard({question}) {
	const [editMode, setEditMode] = useState(false)
	const [showDescription, setShowDescription] = useState(false)

	QuestionCard.handleClickOutside = () => setEditMode(false)

	return (
		<Card className="question-card">
			{editMode ? (
				<>
					<Form
						initialValues={{title: question.title, type: question.type, description: question.description}}
					>
						<Row gutter={[20]}>
							<Col md={12}>
								<Form.Item name="title">
									<Input size="large" placeholder="Question" />
								</Form.Item>
							</Col>
							<Col md={12}>
								<Form.Item name="type">
									<Select size="large" onSelect={() => setEditMode(true)}>
										<Option value="quiz">Quiz</Option>
										<Option value="text">Text</Option>
									</Select>
								</Form.Item>
							</Col>
							{showDescription || question.description ? (
								<Col md={24}>
									<Form.Item name="description">
										<Input size="small" placeholder="Description" />
									</Form.Item>
								</Col>
							) : (
								<></>
							)}
						</Row>
					</Form>
					{question.type === 'quiz' ? (
						<List loadMore={<Button icon={<PlusCircleOutlined />}>New Question</Button>}>
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
								checked={question.required}
							/>
							<Switch
								checkedChildren="description"
								unCheckedChildren="description"
								checked={showDescription}
								onChange={checked => setShowDescription(checked)}
							/>
						</Space>
						<Divider type="vertical" />
						<Tooltip title="Delete">
							<Button icon={<DeleteOutlined />} />
						</Tooltip>
					</div>
				</>
			) : (
				<>
					<div className="question-header">
						<Title level={4}>{question.title}</Title>
						<Button icon={<EditOutlined />} onClick={() => setEditMode(true)} />
					</div>
					{question.description && <Text type="secondary">{question.description}</Text>}
					{question.type === 'quiz' ? (
						<List>
							{question.answers.map(answer => (
								<List.Item key={answer.id}>{answer.body}</List.Item>
							))}
						</List>
					) : (
						<Input.TextArea readOnly placeholder="Detailed answer" autoSize className="detailed-input" />
					)}
				</>
			)}
		</Card>
	)
}

const clickOutsideConfig = {
	handleClickOutside: () => QuestionCard.handleClickOutside
}

export default onClickOutside(QuestionCard, clickOutsideConfig)
