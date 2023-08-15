import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
type Query {
    getHouses: [House]
    getHouseById(id: Int!): House
}

type Mutation {
    addHouse(link: String!, price: Int!, anaRate: Int, didacRate: Int, anaNotes: String, didacNotes: String): House
    editHouse(id: Int!, link: String!, price: Int!): House
    anaRate(id: Int!, rate: Int!): House
    didacRate(id: Int!, rate: Int!): House
    anaNotes(id: Int!, notes: String!): House
    didacNotes(id: Int!, notes: String!): House
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