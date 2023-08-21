import { House } from "../../__generated__/resolvers-types"
import { IDBHouse } from "../../database"
import getGlobalRate from "./getGlobalRate"

export default (data: IDBHouse[]): House[] => {
  return data.map((house) => ({
    id: house.id,
    link: house.link,
    price: house.price,
    realPrice: house.realPrice,
    title: house.title,
    description: house.description,
    images: JSON.parse(house.images.replaceAll("'", '"')),
    mapImage: house.mapImage,
    globalRate: getGlobalRate(house.anaRate, house.didacRate),
    location: {
      lat: house.lat,
      lon: house.lon,
      city: house.city
    },
    features: {
      area: house.area,
      rooms: house.rooms,
      baths: house.baths
    },
    ana: {
      carDuration: house.anaCar,
      rate: house.anaRate,
      notes: house.anaNotes,
    },
    didac: {
      carDuration: house.didacCar,
      rate: house.didacRate,
      notes: house.didacNotes,
    }
  }))
}