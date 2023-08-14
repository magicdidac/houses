import axios from "axios"
import { IGetAllData, IHouse, IHouseProperties } from "./interfaces"

export const stringNullable = (value?: string) => {
  if (!value) return 'NULL'
  return `"${value}"`
}

const infoBetween = (str: string, start: string, end: string) => {
  return str.split(start)[1].split(end)[0]
}

export const parseHouse = (data: IGetAllData): IHouse => {
  console.log('Start to process house', data.house.id)
  const banner = infoBetween(data.habitacliaData, 'print-xl" src="', '">')
  const houseData = data.habitacliaData.split('id="ficha"')[1]
  const title = infoBetween(houseData, '<h1>', '</h1>')
  const price = infoBetween(houseData, 'itemprop="price">', '</span>')
  console.log('Finished to process house', data.house.id)

  return {
    ...data.house,
    properties: {
      banner,
      title,
      price
    }
  }
}