import {gql} from '@apollo/client'

export const DELETE_FORM_MUTATION = gql`
    mutation deleteForm($id: ID!) {
        deleteForm(id: $id)
    }
`
