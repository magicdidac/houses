import axios from "axios"
import { IDBHouse, IHouseFeatures, IHouseLocation } from "./interfaces"
import { AnaHouse, DidacHouse } from "./constants"

export const stringNullable = (value?: string) => {
  if (!value) return 'NULL'
  return `"${value}"`
}

const infoBetween = (str: string, start: string, end: string) => {
  return str.split(start)[1].split(end)[0]
}

export const replaceAll = (str: string, from: string, to: string): string => {
  if (str.includes(from)) {
    return replaceAll(str.replace(from, to), from, to)
  }
  return str
}

const getProperties = (data: string) => {
  const desktopInfo = infoBetween(data, 'var FichaDesktopDTO = {', '};')

  const title = infoBetween(desktopInfo, "destacado: '", "',")
  const realPrice = parseInt(infoBetween(desktopInfo, "precioProducto: '", "',"))
  const description = replaceAll(infoBetween(desktopInfo, "observaciones: '", "',"), '\\u003cbr\\u003e', '\n')

  return {
    title,
    realPrice,
    description
  }
}

const getFeatures = (str: string): IHouseFeatures => {
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

const getLocation = (data: string): IHouseLocation => {
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

const formatSeconds = (seconds: number): string => {
  const time = new Date(seconds * 1000).toISOString().slice(11, 19)
  return time
}

const getCarDurations = async (location: IHouseLocation): Promise<{ ana: string, didac: string }> => {
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

const getImages = (data: string): string[] => {
  const mediaData = infoBetween(data, 'var WideMediaDTO = ', '};')
  const imagesObject = (JSON.parse(replaceAll(infoBetween(mediaData, 'image: JSON.parse("', '"),'), '\\"', '"'))).sort((a, b) => a.Orden - b.Orden) as any[]

  return imagesObject.map(img => (img.URLXL))
}

export const calculateGlobalRate = (anaRate?: number, didacRate?: number): number | undefined => {
  if (anaRate && didacRate) return (anaRate + didacRate) / 2
  return undefined
}

export const getCompletHouse = async (link: string, price: number, anaRate?: number, didacRate?: number, anaNotes?: string, didacNotes?: string): Promise<IDBHouse> => {
  const habitaclia = (await axios.get(link)).data

  const features = getFeatures(habitaclia)
  const location = getLocation(habitaclia)
  const cars = await getCarDurations(location)
  const images = getImages(habitaclia)
  const { title, description, realPrice } = getProperties(habitaclia)

  return {
    id: 0,
    link: link,
    price: price,
    realPrice: realPrice,
    title: title,
    description: description,
    images: replaceAll((JSON.stringify(images)), '"', "'"),
    city: location.city,
    anaRate: anaRate,
    anaNotes: anaNotes,
    anaCar: cars.ana,
    didacRate: didacRate,
    didacNotes: didacNotes,
    didacCar: cars.didac,
    lat: location.lat,
    lon: location.lon,
    area: features.area,
    rooms: features.rooms,
    baths: features.baths
  }
}