export default (seconds: number): string => {
  const time = new Date(seconds * 1000).toISOString().slice(11, 16)
  return time
}