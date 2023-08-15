export interface IHouseProperties {
  title: string
  price: number
  banner: string
  description: string
}

export interface IHouseFeatures {
  area: number
  bedrooms?: number
  baths?: number
}

export interface IPersonInfo {
  rate?: number
  notes?: string
}

export interface IHouse {
  id: number
  link: string
  price: number
  properties: IHouseProperties
  features: IHouseFeatures
  images: string[]
  globalRate?: number
  ana: IPersonInfo
  didac: IPersonInfo
}

export interface IGetAllData {
  house: IHouse,
  habitacliaData: string
}