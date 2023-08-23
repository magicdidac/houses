import axios from "axios"
import { HouseLocation } from "../../__generated__/resolvers-types"
import formatSeconds from "../common/formatSeconds"
import { AnaHouse, DidacHouse } from "../../constants"

export default async (location: HouseLocation): Promise<{ ana: string, didac: string }> => {
  try {
    const anaDuration = (await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${AnaHouse.lon},${AnaHouse.lat}&end=${location.lon},${location.lat}`))
      .data.features[0].properties.segments[0].duration
    const didacDuration = (await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${DidacHouse.lon},${DidacHouse.lat}&end=${location.lon},${location.lat}`))
      .data.features[0].properties.segments[0].duration

    return {
      ana: formatSeconds(anaDuration),
      didac: formatSeconds(didacDuration)
    }
  } catch (e) {
    return {
      ana: 'None',
      didac: 'None'
    }
  }
}