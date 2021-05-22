import {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'

import {AuthContext} from '../../context/auth'

/**
 * @param {ReactNode} component - component that sould be rendered if user exists
 * @returns {Route} - rendered component or redirect to login page if user doesn't exist
 */
export const ProtectedRoute = ({component: Component, ...rest}) => {
	const {user} = useContext(AuthContext)

	return <Route {...rest} render={props => (user ? <Component {...props} /> : <Redirect to="/login" />)} />
}
