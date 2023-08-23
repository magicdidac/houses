import { IFields } from "./interfaces"
import parseFields from "./parseFields"

export default (tableName: string, fields: IFields): string => {
  const newFields = parseFields(fields)

  let query = `INSERT INTO ${tableName} (`
  query += Object.keys(newFields).join(' ,')
  query += ') VALUES ('
  query += Object.values(newFields).join(' ,')
  query += ');'

  return query
}