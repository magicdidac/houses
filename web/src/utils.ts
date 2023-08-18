import { IHouse, IHouseLocation } from "./Api/interfaces"

export const formatNumber = (value: number): string => {
    if (value === 0) return '00'
    if (value > 9) return value + ''
    return '0' + value
}

export const formatCurrency = (value: number): string => {
    const valueWithDots = (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return valueWithDots + ' €'
}

export const getRatingMessage = (house: IHouse): string => {
    if (!house.ana.rate) {
        if (!house.didac.rate) {
            return 'No habeis puntuado esta casa'
        }
        return 'Ana no ha puntuado esta casa'
    }
    if (!house.didac.rate) {
        return 'Dídac no ha puntuado esta casa'
    }
    return ''
}

export const formatHabitacliaLink = (str: string): string => {
    let url = str
    if (url.includes('m.')) url = url.replace('m.', '')
    if (url.includes('?')) url = url.split('?')[0]
    if (url.includes('.htm')) url = url.split('.htm')[0] + '.htm'

    return url
}

export const formatSeconds = (seconds: number): string => {
    const time = new Date(seconds * 1000).toISOString().slice(11, 19)
    return time
}

export const createMapsRouteLink = (house: IHouseLocation, personHouse: { lat: string, lon: string }): string => {
    return `https://www.google.es/maps/dir/${personHouse.lat},${personHouse.lon}/${house.lat},${house.lon}/data=!3m1!4b1!4m2!4m1!3e0?entry=ttu`
}

export const createMapsPlaceLink = (location: IHouseLocation): string => {
    return `https://www.google.es/maps/place/${location.lat},${location.lon}/15.5z`
}