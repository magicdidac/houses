export const stringNullable = (value?: string) => {
  if (!value) return 'NULL'
  return `"${value}"`
}