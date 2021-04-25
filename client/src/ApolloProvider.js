import React from 'react'
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import App from './App'
import { tokenAdapter } from './storage'

const link = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})

const authLink = setContext(() => {
    const token = tokenAdapter.getToken()

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>   
)
