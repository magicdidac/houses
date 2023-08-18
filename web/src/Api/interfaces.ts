export interface IHouseFeatures {
  area: number
  rooms: number
  baths?: number
}

export interface IPersonInfo {
  rate?: number
  notes?: string
  carDuration: string
}

export interface IHouseLocation {
  lat: string
  lon: string
  city: string
}

export interface IHouse {
  id: number
  link: string
  price: number
  realPrice: number
  title: string
  description: string
  images: string[]
  mapImage: string
  features: IHouseFeatures
  location: IHouseLocation
  globalRate?: number
  ana: IPersonInfo
  didac: IPersonInfo
}