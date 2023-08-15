import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
type Query {
    getHouses: [House]
    getHouseById(id: Int!): House
}

type Mutation {
    addHouse(link: String!, price: Int!, anaRate: Int, didacRate: Int, anaNotes: String, didacNotes: String): Boolean
    editHouse(id: Int!, link: String!, price: Int!): Boolean
    anaRate(id: Int!, rate: Int!): Boolean
    didacRate(id: Int!, rate: Int!): Boolean
    anaNotes(id: Int!, notes: String!): Boolean
    didacNotes(id: Int!, notes: String!): Boolean
}

type House {
    id: Int!
    link: String!
    price: Int!
    globalRate: Float
    properties: HouseProperties!
    features: HouseFeatures!
    images: [String]!
    ana: PersonInfo!
    didac: PersonInfo!
}

type PersonInfo {
    rate: Int
    notes: String
}

type HouseProperties {
    title: String!
    price: Int!
    banner: String!
    description: String!
}

type HouseFeatures {
    area: Int!
    baths: Int
    bedrooms: Int
}

`