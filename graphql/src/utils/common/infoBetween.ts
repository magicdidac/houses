export default (str: string, start: string, end: string) => {
  return str.split(start)[1].split(end)[0]
}