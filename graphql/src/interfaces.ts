
export interface IHouseProperties {
  title: string
  price: string
  banner: string
}

export interface IHouse {
  id: number
  link: string
  price: number
  properties: IHouseProperties
  anaRate?: number
  anaNotes?: string
  didacRate?: number
  didacNotes?: string
  globalRate?: number
}

export interface IGetAllData {
  house: IHouse,
  habitacliaData: string
}