import { GET_HOUSES, GET_HOUSE_BY_ID, IS_DUPLICATED } from "./queries"
import { ADD_HOUSE, EDIT_HOUSE, DISABLE_HOUSE } from './mutations'

export const allFields = `
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

export {
  GET_HOUSES,
  GET_HOUSE_BY_ID,
  IS_DUPLICATED,

  ADD_HOUSE,
  EDIT_HOUSE,
  DISABLE_HOUSE
}