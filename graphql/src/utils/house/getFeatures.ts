import { HouseFeatures } from "../../__generated__/resolvers-types"
import infoBetween from "../common/infoBetween"

export default (str: string): HouseFeatures => {
  const featureList = str
    .split('class="feature-container">')[1]
    .split('<li class="feature feature-surface">')[0]
    .split('<li class="feature">')
    .map(feature => feature.replace('</li>', '').trim())
    .filter(s => !s.includes('€'))

  let area = 0
  let baths = 0
  let rooms = 0

  for (const feature of featureList) {
    if (feature.includes('m<sup>2')) {
      area = parseInt(infoBetween(feature, '<strong>', '</strong>'))
    } else if (feature.includes('hab.')) {
      rooms = parseInt(infoBetween(feature, '<strong>', '</strong>'))
    } else if (feature.includes('ba&#241;o')) {
      baths = parseInt(infoBetween(feature, '<strong>', '</strong>'))
    }
  }

  return {
    area,
    rooms,
    baths: baths === 0 ? undefined : baths,
  }
}