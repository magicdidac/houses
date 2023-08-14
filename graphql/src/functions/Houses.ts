import axios from "axios"
import { callDB } from "../database"
import { IGetAllData, IHouse } from "../interfaces"
import { parseHouse, stringNullable } from "../utils"

const commonSelect = 'SELECT *, ((anaRate+didacRate) DIV 2) as globalRate FROM Houses'

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
              price: '',
              title: ''
            },
            anaRate: house.anaRate,
            anaNotes: house.anaNotes,
            didacRate: house.didacRate,
            didacNotes: house.didacNotes,
            globalRate: house.globalRate,
          }
        }
      )
    })
  })
}

export const getHouses = async () => {
  console.log('Called Lambda!')
  const data = await callDB(`${commonSelect} ORDER BY id DESC`)
  console.log('Getted DB info')
  const promises = data.map((house: IHouse) => getAllData(house))
  console.log('Start getting moreInfo')
  const parsedData = await Promise.all(promises)
  console.log('All info getted!')

  console.log('Processing Data')
  const finalData = parsedData.map((house) => parseHouse(house))
  console.log('All data processed')

  return finalData
}

export const getHouseById = async (id: number) => {
  const data = await callDB(`${commonSelect} WHERE id = ${id}`)
  const parsedData = await parseHouse(data[0])

  return parsedData
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