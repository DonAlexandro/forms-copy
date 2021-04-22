import React from 'react'
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client'

import App from './App'

const link = createHttpLink({
    uri: process.env.REACT_APP_SERVER_ENDPOINT
})

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>   
)
