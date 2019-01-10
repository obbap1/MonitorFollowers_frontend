import gql from 'graphql-tag'

export const IMAP_MUTATION = gql `mutation imapMutation($email: String!, $password: String!) {
    imapMutation(
        email: $email,
        password: $password
    ){
        email
        data{
            numberOfFollowers
            date
        }
    }
}`

