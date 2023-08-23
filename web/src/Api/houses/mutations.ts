import { gql } from "@apollo/client"

export const ADD_HOUSE = gql`
mutation AddHouse($link: String!, $price: Int!, $anaRate: Int, $didacRate: Int, $anaNotes: String, $didacNotes: String) {
  addHouse(link: $link, price: $price, anaRate: $anaRate, didacRate: $didacRate, anaNotes: $anaNotes, didacNotes: $didacNotes)
}
`

export const EDIT_HOUSE = gql`
mutation EditHouse($id: Int!, $anaRate: Int, $anaNotes: String, $didacRate: Int, $didacNotes: String) {
  editHouse(id: $id, anaRate: $anaRate, anaNotes: $anaNotes, didacRate: $didacRate, didacNotes: $didacNotes)
}
`

export const DISABLE_HOUSE = gql`
mutation DisableHouse($id: Int!) {
  disableHouse(id: $id)
}
`