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