export interface IHouse {
  id: number
  link: string
  price: number
  anaRate?: number
  anaNotes?: string
  didacRate?: number
  didacNotes?: string
  globalRate?: number
  properties: IHouseProperties
}

export interface IHouseProperties {
  title: string
  price: string
  banner: string
}