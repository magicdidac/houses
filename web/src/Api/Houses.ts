import { gql } from "@apollo/client";

const allFields = `{
  id
  link
  price
  globalRate
  images
  properties {
    title
    price
    banner
    description
  }
  features {
    area
    baths
    bedrooms
  }
  ana {
    rate
    notes
  }
  didac {
    rate
    notes
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
    ${allFields}
}
`

export const EDIT_HOUSE = gql`
mutation ($id: Int!, $link: String!, $price: Int!){
  editHouse(id: $id, link: $link, price: $price)
    ${allFields}
}
`

export const ANA_RATE = gql`
mutation ($id: Int!, $rate: Int!) {
  anaRate(id: $id, rate: $rate)
    ${allFields}
}
`

export const DIDAC_RATE = gql`
mutation ($id: Int!, $rate: Int!) {
  didacRate(id: $id, rate: $rate)
    ${allFields}
}
`

export const ANA_NOTES = gql`
mutation ($id: Int!, $notes: String!) {
  anaNotes(id: $id, notes: $notes)
    ${allFields}
}
`

export const DIDAC_NOTES = gql`
mutation ($id: Int!, $notes: String!) {
  didacNotes(id: $id, notes: $notes)
    ${allFields}
}
`