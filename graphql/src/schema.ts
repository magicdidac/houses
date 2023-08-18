import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
type Query {
    getHouses: [House]
    getHouseById(id: Int!): House
}

type Mutation {
    addHouse(
        link: String!,
        price: Int!,
        anaRate: Int,
        didacRate: Int,
        anaNotes: String,
        didacNotes: String,

    ): Boolean
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
    realPrice: Int!
    title: String!
    description: String!
    images: [String]!
    features: HouseFeatures!
    location: HouseLocation!
    globalRate: Float
    ana: PersonInfo!
    didac: PersonInfo!
}

type PersonInfo {
    rate: Int
    notes: String
    carDuration: String!
}

type HouseFeatures {
    area: Int!
    rooms: Int!
    baths: Int
}

type HouseLocation {
    lat: String!
    lon: String!
}
`