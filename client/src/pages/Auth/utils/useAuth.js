import {useContext} from 'react'
import {message} from 'antd'
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/client'

import {AuthContext} from '../../../context/auth'

export const useAuth = (mutation, resolver, variables) => {
    const {login} = useContext(AuthContext)
    const history = useHistory()

    const [authUser, {loading}] = useMutation(mutation, {
        update(_, {data: {[resolver]: user}}) {
            login(user)
            history.push('/')
        },
        onError(err) {
            message.error(Object.values(err.graphQLErrors[0].extensions.errors)[0])
        },
        variables
    })

    return {authUser, loading}
}
