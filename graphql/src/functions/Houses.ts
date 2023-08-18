import { callDB } from "../database"
import { IDBHouse, IHouse } from "../interfaces"
import { insert } from "../sqlUtils"
import { calculateGlobalRate, getCompletHouse, replaceAll, stringNullable } from "../utils"

const commonSelect = 'SELECT * FROM Houses'

const formatHouses = (data: IDBHouse[]): IHouse[] => {
  return data.map((house) => ({
    id: house.id,
    link: house.link,
    price: house.price,
    realPrice: house.realPrice,
    title: house.title,
    description: house.description,
    images: JSON.parse(replaceAll(house.images, "'", '"')),
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

export const getHouses = async (): Promise<IHouse[]> => {
  const data = await callDB(`${commonSelect} WHERE disabled = FALSE ORDER BY id DESC`)

  return formatHouses(data)
}

export const getHouseById = async (id: number): Promise<IHouse> => {
  const data = await callDB(`${commonSelect} WHERE id = ${id}`)
  return formatHouses(data)[0]
}

export const addHouse = async (
  link: string,
  price: number,
  anaRate?: number,
  didacRate?: number,
  anaNotes?: string,
  didacNotes?: string,
): Promise<boolean> => {
  try {
    const house = await getCompletHouse(link, price, anaRate, didacRate, anaNotes, didacNotes)

    await callDB(insert({
      link: `"${house.link}"`,
      price: house.price,
      realPrice: house.realPrice,
      title: `"${house.title}"`,
      description: `"${house.description}"`,
      images: `"${house.images}"`,
      city: `"${house.city}"`,
      lat: `"${house.lat}"`,
      lon: `"${house.lon}"`,
      area: house.area,
      rooms: house.rooms,
      baths: house.baths ?? 'NULL',
      anaRate: house.anaRate ?? 'NULL',
      anaNotes: stringNullable(house.anaNotes),
      anaCar: `"${house.anaCar}"`,
      didacRate: house.didacRate ?? 'NULL',
      didacNotes: stringNullable(house.didacNotes),
      didacCar: `"${house.didacCar}"`
    }))

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const editHouse = async (id: number, link: string, price: number): Promise<boolean> => {
  await callDB(`
    UPDATE Houses
    SET link="${link}", price=${price}
    WHERE id=${id}
  `)

  return true
}

export const anaRate = async (id: number, rate: number): Promise<boolean> => {
  await callDB(`
    UPDATE Houses
    SET anaRate=${rate}
    WHERE id=${id}
  `)

  return true
}

export const didacRate = async (id: number, rate: number): Promise<boolean> => {
  await callDB(`
    UPDATE Houses
    SET didacRate=${rate}
    WHERE id=${id}
  `)

  return true
}

export const anaNotes = async (id: number, notes: string): Promise<boolean> => {
  await callDB(`
    UPDATE Houses
    SET anaNotes="${notes}"
    WHERE id=${id}
  `)

  return true
}

export const didacNotes = async (id: number, notes: string): Promise<boolean> => {
  await callDB(`
    UPDATE Houses
    SET didacNotes="${notes}"
    WHERE id=${id}
  `)

  return true
}