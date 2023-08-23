import infoBetween from "../common/infoBetween"

export default (data: string): string[] => {
  const mediaData = infoBetween(data, 'var WideMediaDTO = ', '};')
  const imagesObject = (
    JSON.parse(
      infoBetween(
        mediaData,
        'image: JSON.parse("',
        '"),'
      ).replaceAll('\\"', '"')
    )
  ).sort((a, b) => a.Orden - b.Orden) as any[]

  return imagesObject.map(img => (img.URLXL))
}