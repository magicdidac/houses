import { callDB } from "../database"
import { parseHouse, stringNullable } from "../utils"

const commonSelect = 'SELECT *, ((anaRate+didacRate) DIV 2) as globalRate FROM Houses'

export const getHouses = async () => {
  const data = await callDB(`${commonSelect} ORDER BY id DESC`)
  const promises = data.map((house) => parseHouse(house))
  const parsedData = await Promise.all(promises)

  return parsedData
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