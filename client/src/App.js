import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Layout} from 'antd'

import { AuthProvider } from './context/auth'
import { routes } from './utils/router/routes'

const {Content} = Layout

function App() {
	return (
		<AuthProvider>
			<Router>
				<Layout>
					<Content>
						{routes}
					</Content>
				</Layout>
			</Router>
		</AuthProvider>
	)
}

export default App
