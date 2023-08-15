import { IHouse } from "./interfaces"

export const formatNumber = (value: number): string => {
    if (value === 0) return '00'
    if (value > 9) return value + ''
    return '0' + value
}

export const formatCurrency = (value: number): string => {
    const valueWithDots = (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return valueWithDots + ' €'
}

export const getDisclamer = (house: IHouse): string => {
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