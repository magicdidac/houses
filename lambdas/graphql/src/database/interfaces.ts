export interface IDBHouse {
  id: number
  link: string
  price: number
  realPrice: number
  title: string
  description: string
  images: string
  mapImage: string
  city: string
  anaRate?: number
  anaNotes?: string
  anaCar: string
  didacRate?: number
  didacNotes?: string
  didacCar: string
  lat: string
  lon: string
  area: number
  rooms: number
  baths?: number
}