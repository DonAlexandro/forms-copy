import {useContext} from 'react'
import {Button, PageHeader} from 'antd'

import {AuthContext} from '../../context/auth'
import FormsList from './components/FormsList'
import MainLayout from '../../layouts/Main'
import Container from '../../components/Container'
import CreateFormButton from './components/CreateFormButton'

const Home = () => {
	const {logout, user} = useContext(AuthContext)

	return (
		<MainLayout>
			<PageHeader
				title={`Hello, ${user.username}`}
				className="page-header"
				extra={[
					<CreateFormButton key="new" />,
					<Button onClick={logout} key="logout">
						Logout
					</Button>
				]}
			/>
			<Container>
				<FormsList />
			</Container>
		</MainLayout>
	)
}

export default Home
