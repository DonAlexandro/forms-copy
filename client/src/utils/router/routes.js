import {Switch} from 'react-router-dom'

import Login from '../../pages/Auth/Login'
import Signup from '../../pages/Auth/Signup'
import Home from '../../pages/Home'
import FormEditing from '../../pages/FormEditing'
import {ProtectedRoute} from './protectedRoute'
import {AuthRoute} from './authRoute'

export const routes = (
	<Switch>
		<AuthRoute exact path="/login" component={Login} />
		<AuthRoute exact path="/signup" component={Signup} />
		<ProtectedRoute exact path="/" component={Home} />
		<ProtectedRoute exact path="/form/:id" component={FormEditing} />
	</Switch>
)
