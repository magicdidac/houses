import { IHouse, IHouseFeatures, IHouseImages, IHouseProperties } from "./interfaces"
import { IGetAllData, IImagesObject } from "./utilInterfaces"

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
    bedrooms,
    baths: baths === 0 ? undefined : baths,
  }
}

const getImages = (str: string): IHouseImages => {
  const mediaData = infoBetween(str, 'var WideMediaDTO = ', '};')
  const imagesObject = (JSON.parse(replaceAll(infoBetween(mediaData, 'image: JSON.parse("', '"),'), '\\"', '"')) as IImagesObject[]).sort((a, b) => a.Orden - b.Orden)
  const mapImage = infoBetween(mediaData, "mapImage: '", "',")

  return {
    map: mapImage,
    gallery: imagesObject.map(img => ({
      main: img.URLG,
      small: img.URL,
      big: img.URLXL,
    }))
  }
}

export const parseHouse = ({ habitacliaData, house }: IGetAllData): IHouse => {
  const houseData = habitacliaData.split('id="ficha"')[1]

  const properties = getProperties(houseData, habitacliaData)
  const features = getFeatures(houseData)
  const images = getImages(houseData)

  return {
    ...house,
    properties,
    features,
    images
  }
}