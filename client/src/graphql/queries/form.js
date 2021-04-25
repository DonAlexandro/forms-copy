import {gql} from 'graphql-tag'

export const FORMS_QUERY = gql`
    {
        getForms {
            id
            title
            description
            createdAt
            color
        }
    }
`