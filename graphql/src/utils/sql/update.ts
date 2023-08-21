import { IFields } from "./interfaces"
import parseFields from "./parseFields"

export default (tableName: string, where: string, fields: IFields): string => {
  const newFields = parseFields(fields)
  const values: string[] = []
  for (const key of Object.keys(newFields)) {
    values.push(`${key}=${newFields[key]}`)
  }

  return `UPDATE FROM ${tableName} SET ${values.join(', ')} WHERE ${where};`
}