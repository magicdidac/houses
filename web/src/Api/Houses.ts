import { gql } from "@apollo/client";

const allFields = `
{
  id
  link
  price
  realPrice
  title
  description
  images
  mapImage
  features {
    area
    rooms
    baths
  }
  location {
    lat
    lon
    city
  }
  globalRate
  ana {
    rate
    notes
    carDuration
  }
  didac {
    rate
    notes
    carDuration
  }
}
`

export const GET_HOUSES = gql`
query {
  getHouses ${allFields}
}
`

export const GET_HOUSE_BY_ID = gql`
query ($id: Int!) {
  getHouseById(id:$id) ${allFields}
}
`

export const ADD_HOUSE = gql`
mutation ($link: String!, $price: Int!, $anaRate: Int, $didacRate: Int, $anaNotes: String, $didacNotes: String) {
  addHouse(link: $link, price: $price, anaRate: $anaRate, didacRate: $didacRate, anaNotes: $anaNotes, didacNotes: $didacNotes)
}
`

export const EDIT_HOUSE = gql`
mutation ($id: Int!, $link: String!, $price: Int!){
  editHouse(id: $id, link: $link, price: $price)
}
`

export const ANA_RATE = gql`
mutation ($id: Int!, $rate: Int!) {
  anaRate(id: $id, rate: $rate)
}
`

export const DIDAC_RATE = gql`
mutation ($id: Int!, $rate: Int!) {
  didacRate(id: $id, rate: $rate)
}
`

export const ANA_NOTES = gql`
mutation ($id: Int!, $notes: String!) {
  anaNotes(id: $id, notes: $notes)
}
`

export const DIDAC_NOTES = gql`
mutation ($id: Int!, $notes: String!) {
  didacNotes(id: $id, notes: $notes)
}
`

export const DISABLE_HOUSE = gql`
mutation ($id: Int!){
  disableHouse(id: $id)
}
`