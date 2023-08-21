import { House, MutationAddHouseArgs, MutationAnaNotesArgs, MutationAnaRateArgs, MutationDidacNotesArgs, MutationDidacRateArgs, MutationDisableHouseArgs, MutationEditHouseArgs, QueryGetHouseByIdArgs, QueryIsDuplicatedArgs } from "../__generated__/resolvers-types"
import { callDB } from "../database"
import { IDBHouse } from "../interfaces"
import { insert, update } from "../sqlUtils"
import { calculateGlobalRate, getCompletHouse, replaceAll } from "../utils"

const commonSelect = 'SELECT * FROM Houses'

const formatHouses = (data: IDBHouse[]): House[] => {
  return data.map((house) => ({
    id: house.id,
    link: house.link,
    price: house.price,
    realPrice: house.realPrice,
    title: house.title,
    description: house.description,
    images: JSON.parse(replaceAll(house.images, "'", '"')),
    mapImage: house.mapImage,
    globalRate: calculateGlobalRate(house.anaRate, house.didacRate),
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

/* ____QUERIES____ */

export const getHouses = async (): Promise<House[]> => {
  const data = await callDB(`${commonSelect} WHERE disabled = FALSE ORDER BY id DESC`)

  return formatHouses(data)
}

export const getHouseById = async ({ id }: QueryGetHouseByIdArgs): Promise<House> => {
  const data = await callDB(`${commonSelect} WHERE id = ${id}`)
  return formatHouses(data)[0]
}

export const isDuplicated = async ({ link }: QueryIsDuplicatedArgs): Promise<number | undefined> => {
  const houses = await callDB(`SELECT id FROM Houses WHERE disabled = FALSE AND link = "${link}"`)

  return (houses.length === 0) ? undefined : houses[0].id
}







/* ____MUTATIONS____ */

export const addHouse = async ({ link, price, anaRate, anaNotes, didacRate, didacNotes }: MutationAddHouseArgs): Promise<boolean> => {
  try {
    const house = await getCompletHouse(link, price, anaRate, didacRate, anaNotes, didacNotes)

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

export const disableHouse = async ({ id }: MutationDisableHouseArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { disabled: true }))

  return true
}

export const editHouse = async ({ id, link, price }: MutationEditHouseArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { link, price }))

  return true
}

export const anaRate = async ({ id, rate }: MutationAnaRateArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { anaRate: rate }))

  return true
}

export const didacRate = async ({ id, rate }: MutationDidacRateArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { didacRate: rate }))

  return true
}

export const anaNotes = async ({ id, notes }: MutationAnaNotesArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { anaNotes: notes }))

  return true
}

export const didacNotes = async ({ id, notes }: MutationDidacNotesArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { didacNotes: notes }))

  return true
}