import axios from "axios"
import { callDB } from "../database"
import { IGetAllData, IHouse } from "../interfaces"
import { parseHouse, stringNullable } from "../utils"

const commonSelect = 'SELECT * FROM Houses'

const getAllData = (house: any): Promise<IGetAllData> => {
  return new Promise((resolve) => {
    axios.get(house.link).then((response) => {
      resolve(
        {
          habitacliaData: response.data as string,
          house: {
            ...house,
            ana: {
              rate: house.anaRate,
              notes: house.anaNotes
            },
            didac: {
              rate: house.didacRate,
              notes: house.didacNotes
            },
            globalRate: (house.anaRate && house.didacRate) ? (house.anaRate + house.didacRate) / 2 : undefined,
          }
        }
      )
    })
  })
}

const formatHouses = async (data: any[]): Promise<IHouse[]> => {
  const promises: Promise<IGetAllData>[] = []
  for (const house of data) {
    promises.push(getAllData(house))
  }
  const parsedData = await Promise.all(promises)
  const finalData = parsedData.map((house) => {
    try {
      return parseHouse(house)
    } catch (e) {
      callDB(`DELETE FROM Houses WHERE id = ${house.house.id}`)
    }
  })

  return finalData.filter(house => !!house) as IHouse[]
}

export const getHouses = async (): Promise<IHouse[]> => {
  const data = await callDB(`${commonSelect} ORDER BY id DESC`)
  const houses = await formatHouses(data)

  return houses
}

export const getHouseById = async (id: number): Promise<IHouse> => {
  const data = await callDB(`${commonSelect} WHERE id = ${id}`)
  const houses = await formatHouses(data)

  return houses[0]
}

export const addHouse = async (link: string, price: number, anaRate?: number, didacRate?: number, anaNotes?: string, didacNotes?: string): Promise<boolean> => {
  await callDB(`
    INSERT INTO Houses (link, price, anaRate, anaNotes, didacRate, didacNotes)
    VALUES ("${link}", ${price}, ${anaRate ?? 'NULL'}, ${stringNullable(anaNotes)}, ${didacRate ?? 'NULL'}, ${stringNullable(didacNotes)})
  `)

  return true
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