import axios from "axios"
import { callDB } from "../database"
import { IGetAllData, IHouse } from "../interfaces"
import { parseHouse, stringNullable } from "../utils"

const commonSelect = 'SELECT * FROM Houses'

const getAllData = (house: IHouse): Promise<IGetAllData> => {
  return new Promise((resolve) => {
    axios.get(house.link).then((response) => {
      resolve(
        {
          habitacliaData: response.data as string,
          house: {
            id: house.id,
            link: house.link,
            price: house.price,
            properties: {
              banner: '',
              price: 0,
              title: ''
            },
            anaRate: house.anaRate,
            anaNotes: house.anaNotes,
            didacRate: house.didacRate,
            didacNotes: house.didacNotes,
            globalRate: (house.anaRate && house.didacRate) ? (house.anaRate + house.didacRate) / 2 : undefined,
          }
        }
      )
    })
  })
}

export const getHouses = async () => {
  console.log('Get Houses')
  const data = await callDB(`${commonSelect} ORDER BY id DESC`)
  const promises: Promise<IGetAllData>[] = []
  for (const house of data) {
    promises.push(getAllData(house))
  }
  const parsedData = await Promise.all(promises)
  const finalData = parsedData.map((house) => parseHouse(house))

  return finalData
}

export const getHouseById = async (id: number) => {
  const data = (await callDB(`${commonSelect} WHERE id = ${id}`))[0]
  const houseWithAllData = await getAllData(data)
  const parsedHouse = parseHouse(houseWithAllData)

  return parsedHouse
}

export const addHouse = async (link: string, price: number, anaRate?: number, didacRate?: number, anaNotes?: string, didacNotes?: string) => {
  await callDB(`
    INSERT INTO Houses (link, price, anaRate, anaNotes, didacRate, didacNotes)
    VALUES ("${link}", ${price}, ${anaRate ?? 'NULL'}, ${stringNullable(anaNotes)}, ${didacRate ?? 'NULL'}, ${stringNullable(didacNotes)})
  `)

  return (await getHouses())[0]
}

export const editHouse = async (id: number, link: string, price: number) => {
  await callDB(`
    UPDATE Houses
    SET link="${link}", price=${price}
    WHERE id=${id}
  `)

  return await getHouseById(id)
}

export const anaRate = async (id: number, rate: number) => {
  await callDB(`
    UPDATE Houses
    SET anaRate=${rate}
    WHERE id=${id}
  `)

  return await getHouseById(id)
}

export const didacRate = async (id: number, rate: number) => {
  await callDB(`
    UPDATE Houses
    SET didacRate=${rate}
    WHERE id=${id}
  `)

  return await getHouseById(id)
}

export const anaNotes = async (id: number, notes: string) => {
  await callDB(`
    UPDATE Houses
    SET anaNotes="${notes}"
    WHERE id=${id}
  `)

  return await getHouseById(id)
}

export const didacNotes = async (id: number, notes: string) => {
  await callDB(`
    UPDATE Houses
    SET didacNotes="${notes}"
    WHERE id=${id}
  `)

  return await getHouseById(id)
}