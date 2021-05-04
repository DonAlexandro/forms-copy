import {useMutation} from '@apollo/client'
import {Modal, List, Menu, Typography, Skeleton, Dropdown, Button} from 'antd'
import {DeleteOutlined, MoreOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

import {DELETE_FORM_MUTATION} from '../../../graphql/mutations/form'
import {FORMS_QUERY} from '../../../graphql/queries/form'

const {confirm} = Modal
const {Title} = Typography

export const ListItem = ({form, loading}) => {
	const [deleteForm] = useMutation(DELETE_FORM_MUTATION, {
		update(proxy) {
			let data = proxy.readQuery({
				query: FORMS_QUERY
			})

			data = {getForms: data.getForms.filter((f) => f.id !== form.id)}
			proxy.writeQuery({query: FORMS_QUERY, data})
		},
		variables: {id: form.id}
	})

	const showConfirmModal = () =>
		confirm({
			title: 'Are you sure want to delete this form?',
			content: `You won't be able to restore it`,
			okText: 'Delete',
			okType: 'danger',
			onOk: deleteForm
		})

	const menu = (
		<Menu>
			<Menu.Item onClick={showConfirmModal} icon={<DeleteOutlined />}>
				Delete
			</Menu.Item>
		</Menu>
	)

	return (
		<List.Item
			actions={[
				<Dropdown overlay={menu} trigger={['click']}>
					<Button type="text" size="large">
						<MoreOutlined />
					</Button>
				</Dropdown>
			]}
		>
			<Skeleton loading={loading} active>
				<List.Item.Meta
					title={
						<Link to={`/form/${form.id}`}>
							<Title level={5}>{form.title}</Title>
						</Link>
					}
					description={dayjs(form.createdAt).format('DD MMMM YYYY')}
				/>
				{form.description}
			</Skeleton>
		</List.Item>
	)
}
