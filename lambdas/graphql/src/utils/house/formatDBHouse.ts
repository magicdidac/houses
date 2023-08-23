import axios from "axios"
import getMapImage from "./getMapImage"
import getImages from "./getImages"
import getCarDuration from "./getCarDuration"
import getLocation from "./getLocation"
import getFeatures from "./getFeatures"
import getProperties from "./getProperties"
import { IDBHouse } from "../../database"

export default async (link: string, price: number, anaRate?: number, didacRate?: number, anaNotes?: string, didacNotes?: string): Promise<IDBHouse> => {
  const habitaclia = (await axios.get(link)).data

  const features = getFeatures(habitaclia)
  const location = getLocation(habitaclia)
  const cars = await getCarDuration(location)
  const images = getImages(habitaclia)
  const { title, description, realPrice } = getProperties(habitaclia)
  const mapImage = getMapImage(habitaclia)

  return {
    id: 0,
    link: link,
    price: price,
    realPrice: realPrice,
    title: title,
    description: description,
    images: JSON.stringify(images).replaceAll('"', "'"),
    mapImage: mapImage,
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