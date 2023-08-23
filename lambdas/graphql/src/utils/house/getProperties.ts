import infoBetween from "../common/infoBetween"

export default (data: string) => {
  const desktopInfo = infoBetween(data, 'var FichaDesktopDTO = {', '};')

  const title = infoBetween(desktopInfo, "destacado: '", "',")
  const realPrice = parseInt(infoBetween(desktopInfo, "precioProducto: '", "',"))
  const description = infoBetween(desktopInfo, "observaciones: '", "',")
    .replaceAll('\\u003cbr\\u003e', '\n')

  return {
    title,
    realPrice,
    description
  }
}