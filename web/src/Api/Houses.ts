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

export const IS_DUPLICATED = gql`
query ($link: String!) {
  isDuplicated(link: $link)
}
`

export const ADD_HOUSE = gql`
mutation ($link: String!, $price: Int!, $anaRate: Int, $didacRate: Int, $anaNotes: String, $didacNotes: String) {
  addHouse(link: $link, price: $price, anaRate: $anaRate, didacRate: $didacRate, anaNotes: $anaNotes, didacNotes: $didacNotes)
}
`

export const EDIT_HOUSE = gql`
mutation ($id: Int!, $anaRate: Int, $anaNotes: String, $didacRate: Int, $didacNotes: String){
  editHouse(id: $id, anaRate: $anaRate, anaNotes: $anaNotes, didacRate: $didacRate, didacNotes: $didacNotes)
}
`

export const DISABLE_HOUSE = gql`
mutation ($id: Int!){
  disableHouse(id: $id)
}
`