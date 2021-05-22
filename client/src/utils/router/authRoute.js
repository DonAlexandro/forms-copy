import {useContext} from 'react'
import {Redirect, Route} from 'react-router-dom'

import {AuthContext} from '../../context/auth'

/**
 * @param {ReactNode} component - component that sould be rendered if user doesn't exist
 * @returns {Route} - rendered component or redirect to home page if user exists
 */
export const AuthRoute = ({component: Component, ...rest}) => {
	const {user} = useContext(AuthContext)

	return <Route {...rest} render={props => (!user ? <Component {...props} /> : <Redirect to="/" />)} />
}
