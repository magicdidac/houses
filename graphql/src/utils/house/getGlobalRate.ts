export default (anaRate?: number, didacRate?: number): number | undefined => {
  if (anaRate && didacRate) return (anaRate + didacRate) / 2
  return undefined
}