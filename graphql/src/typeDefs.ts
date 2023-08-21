import { gql } from "apollo-server-lambda";

export default gql`
type Query {
  getHouses: [House]
  getHouseById(id: Int!): House
  isDuplicated(link: String!): Int
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
  disableHouse(id: Int!): Boolean
  editHouse(
    id: Int!,
    link: String!,
    price: Int!,
    anaRate: Int,
    didacRate: Int,
    anaNotes: String,
    didacNotes: String
  ): Boolean
}

type House {
  id: Int!
  link: String!
  price: Int!
  realPrice: Int!
  title: String!
  description: String!
  images: [String]!
  mapImage: String!
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
  city: String!
}
`