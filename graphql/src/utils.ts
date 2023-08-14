import axios from "axios"
import { IHouse, IHouseProperties } from "./interfaces"

export const stringNullable = (value?: string) => {
  if (!value) return 'NULL'
  return `"${value}"`
}

const infoBetween = (str: string, start: string, end: string) => {
  return str.split(start)[1].split(end)[0]
}

const getHouseProperties = async (html: string): Promise<IHouseProperties> => {
  console.log('Link:', html, 'gettingProperties')
  const allData: string = ((await axios.get(html)).data as string)
  const banner = infoBetween(allData, 'print-xl" src="', '">')
  const houseData = allData.split('id="ficha"')[1]
  const title = infoBetween(houseData, '<h1>', '</h1>')
  const price = infoBetween(houseData, 'itemprop="price">', '</span>')

  return {
    title,
    price,
    banner
  }
}

export const parseHouse = async (data): Promise<IHouse> => {
  console.log('Hose:', data.id, 'Link:', data.link)
  const properties = await getHouseProperties(data.link)
  console.log('Hose:', data.id, 'Properties getted')

  return {
    ...data,
    properties
  }
}