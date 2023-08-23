import axios from "axios"
import { IDBHouse, callDB } from "./database"
import { infoBetween } from "./utils"


export const handler = async () => {
  const houses = await callDB('SELECT * FROM Houses WHERE disabled = FALSE') as IDBHouse[]

  console.log('Houses getted', houses.length)

  for (const house of houses) {
    const habitaclia = (await axios.get(house.link)).data as string

    try {
      const realPrice = parseInt(infoBetween(habitaclia, "precioProducto: '", "',"))
      console.log('realPrice:', realPrice, '€ for house', house.id)

      await callDB(`UPDATE Houses SET realPrice = ${realPrice} WHERE id = ${house.id}`)
      console.log('CORRECT', house.id)
    } catch (e) {
      console.log('DISABLE house', house.id)
      await callDB(`UPDATE Houses SET disabled = TRUE WHERE id = ${house.id}`)
    }
  }

}