import { gql } from "@apollo/client"
import { allFields } from "."

export const GET_HOUSES = gql`
query GetHouses {
  getHouses ${allFields}
}
`

export const GET_HOUSE_BY_ID = gql`
query GetHouseById($id: Int!) {
  getHouseById(id:$id) ${allFields}
}
`

export const IS_DUPLICATED = gql`
query IsDuplicated($link: String!) {
  isDuplicated(link: $link)
}
`