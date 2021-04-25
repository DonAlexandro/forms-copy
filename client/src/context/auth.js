import {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'

import {tokenAdapter} from '../storage'

const initialState = {
    user: null
}

if (tokenAdapter.getToken()) {
    const token = jwtDecode(tokenAdapter.getToken())

    if (token.exp * 1000 < Date.now()) {
        tokenAdapter.removeToken()
    } else {
        initialState.user = token
    }
}

const AuthContext = createContext({
    user: null,
    login: (user) => {},
    logout: () => {}
})

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        default: return state
    }
}

const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = user => {
        tokenAdapter.setToken(user.token)

        dispatch({
            type: 'LOGIN',
            payload: user
        })
    }

    const logout = () => {
        tokenAdapter.removeToken()

        dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <AuthContext.Provider value={{user: state.user, login, logout}} {...props} />
    )
}

export {AuthContext, AuthProvider}
