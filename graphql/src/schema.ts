import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
type Query {
    getExample: [String]
}
`