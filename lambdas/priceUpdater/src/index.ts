import axios from "axios"
import { IDBHouse, callDB } from "./database"
import { infoBetween } from "./utils"

const updateRealPriceString = (id: number, realPrice: number): string => {
  return `(${id}, ${realPrice})`
}

export const handler = async () => {
  const houses = await callDB('SELECT * FROM Houses WHERE disabled = FALSE') as IDBHouse[]

  console.log('Houses getted', houses.length)
  let housesToDisable: string[] = []
  let housesToUpdateRealPrice: string[] = []

  for (const house of houses) {
    const habitaclia = (await axios.get(house.link)).data as string

    try {
      const realPrice = parseInt(infoBetween(habitaclia, "precioProducto: '", "',"))
      console.log('realPrice:', realPrice, '€ for house', house.id)
      housesToUpdateRealPrice.push(updateRealPriceString(house.id, realPrice))

      console.log('CORRECT', house.id)
    } catch (e) {
      console.log('DISABLE house', house.id)
      housesToDisable.push(`id = ${house.id}`)
      // await callDB(`UPDATE Houses SET disabled = TRUE WHERE id = ${house.id}`)
    }
  }

  if (housesToDisable.length > 0) {
    await callDB(`UPDATE Houses SET disabled = TRUE WHERE ${housesToDisable.join(', ')};`)
  }

  if (housesToUpdateRealPrice.length > 0) {
    await callDB(
      `INSERT INTO Houses (id, realPrice)
      VALUES ${housesToUpdateRealPrice.join(', ')}
      ON DUPLICATE KEY UPDATE realPrice=VALUES(realPrice);`
    )
  }
}