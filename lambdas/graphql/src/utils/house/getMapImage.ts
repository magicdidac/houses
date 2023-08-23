import infoBetween from "../common/infoBetween"

export default (data: string): string => {
  return infoBetween(data, "mapImage: '", "',")
}