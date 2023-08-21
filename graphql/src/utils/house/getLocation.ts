import { HouseLocation } from "../../__generated__/resolvers-types"
import infoBetween from "../common/infoBetween"

export default (data: string): HouseLocation => {
  const cityInfo = infoBetween(data, "var SegmentDTO = {", "};")
  const city = infoBetween(cityInfo, 'city\\":\\"', '\\",')

  const locationInfo = infoBetween(data, "var FichaDesktopDTO = {", "};")
  const lat = infoBetween(locationInfo, 'VGPSLat\\":', ',')
  const lon = infoBetween(locationInfo, 'VGPSLon\\":', ',')

  return {
    city,
    lat,
    lon
  }
}