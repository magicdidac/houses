import { MutationAddHouseArgs } from "../../../__generated__/resolvers-types"
import { callDB } from "../../../database"
import { formatDBHouse, insert } from "../../../utils"

export default async ({ link, price, anaRate, anaNotes, didacRate, didacNotes }: MutationAddHouseArgs): Promise<boolean> => {
  try {
    const house = await formatDBHouse(link, price, anaRate, didacRate, anaNotes, didacNotes)

    await callDB(insert('Houses', {
      link: house.link,
      price: house.price,
      realPrice: house.realPrice,
      title: house.title,
      description: house.description,
      images: house.images,
      mapImage: house.mapImage,
      city: house.city,
      lat: house.lat,
      lon: house.lon,
      area: house.area,
      rooms: house.rooms,
      baths: house.baths,
      anaRate: house.anaRate,
      anaNotes: house.anaNotes,
      anaCar: house.anaCar,
      didacRate: house.didacRate,
      didacNotes: house.didacNotes,
      didacCar: house.didacCar
    }))

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}