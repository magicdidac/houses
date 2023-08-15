import { IGetAllData, IHouse, IHouseFeatures, IHouseProperties } from "./interfaces"

export const stringNullable = (value?: string) => {
  if (!value) return 'NULL'
  return `"${value}"`
}

const infoBetween = (str: string, start: string, end: string) => {
  return str.split(start)[1].split(end)[0]
}

const replaceAll = (str: string, from: string, to: string): string => {
  if (str.includes(from)) {
    return replaceAll(str.replace(from, to), from, to)
  }
  return str
}

const getProperties = (houseData: string, data: string): IHouseProperties => {
  const banner = infoBetween(data, 'print-xl" src="', '">')

  const title = infoBetween(houseData, '<h1>', '</h1>')

  let price = infoBetween(houseData, 'itemprop="price">', '</span>')
  price = price.slice(0, -1).trim().replace('.', '')

  let description = replaceAll(infoBetween(houseData, 'class="detail-description">', '</p'), '<br>', '\n')

  return {
    title,
    banner,
    price: parseInt(price),
    description,
  }
}

const getFeatures = (str: string): IHouseFeatures => {
  const featureList = str
    .split('class="feature-container">')[1]
    .split('<li class="feature feature-surface">')[0]
    .split('<li class="feature">')
    .map(feature => feature.replace('</li>', '').trim())
    .filter(s => !s.includes('€'))

  let area = 0
  let baths = 0
  let bedrooms = 0

  for (const feature of featureList) {
    if (feature.includes('m<sup>2')) {
      area = parseInt(infoBetween(feature, '<strong>', '</strong>'))
    } else if (feature.includes('hab.')) {
      bedrooms = parseInt(infoBetween(feature, '<strong>', '</strong>'))
    } else if (feature.includes('ba&#241;o')) {
      baths = parseInt(infoBetween(feature, '<strong>', '</strong>'))
    }
  }

  return {
    area,
    baths: baths === 0 ? undefined : baths,
    bedrooms: bedrooms === 0 ? undefined : bedrooms
  }
}

const getImages = (str: string): string[] => {
  const allImages = str
    .split('<div class="flex-images">')[1]
    .split('<img')
    .slice(1)
    .map(img => infoBetween(img, 'src="', '"'))

  return allImages
}

export const parseHouse = (data: IGetAllData): IHouse => {
  const houseData = data.habitacliaData.split('id="ficha"')[1]

  const properties = getProperties(houseData, data.habitacliaData)
  const features = getFeatures(houseData)
  const images = getImages(houseData)

  return {
    ...data.house,
    properties,
    features,
    images
  }
}