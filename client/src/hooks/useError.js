import {useEffect, useState} from 'react'
import {message} from 'antd'
import {useHistory} from 'react-router-dom'

import {tokenAdapter} from '../storage'

export const useError = () => {
	const history = useHistory()
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!error) {
			return
		}

		if (error && error.graphQLErrors[0]) {
			if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
				message.error(error.graphQLErrors[0].message)
				tokenAdapter.removeToken()
				history.push('/login')
			} else {
				message.error(Object.values(error.graphQLErrors[0].extensions.errors)[0])
			}
		}
	}, [error, history])

	return setError
}
