import { gql } from '@apollo/client'

export const SIGNUP_MUTATION = gql`
    mutation signup(
        $username: String!
        $email: String!
        $password: String!
        $confirm: String!
    ) {
        signup(signupInput: {
            username: $username
            email: $email
            password: $password
            confirm: $confirm 
        }) {
            id username email password token
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(email: $email password: $password) {
            id username email password token
        }
    }
`
