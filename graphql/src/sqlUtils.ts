interface IFields {
  [key: string]: string | number | boolean | undefined
}

const parseFields = (fields: IFields): IFields => {
  const newFields = { ...fields }
  for (const key of Object.keys(newFields)) {
    if (typeof newFields[key] === 'string') newFields[key] = `"${newFields[key]}"`
    if (typeof newFields[key] === 'boolean') newFields[key] = newFields[key] ? 'TRUE' : 'FALSE'
    if (!newFields[key]) newFields[key] = 'NULL'
  }
  return newFields
}

export const insert = (tableName: string, fields: IFields): string => {
  const newFields = parseFields(fields)

  let query = `INSERT INTO ${tableName} (`
  query += Object.keys(newFields).join(' ,')
  query += ') VALUES ('
  query += Object.values(newFields).join(' ,')
  query += ');'

  return query
}

export const update = (tableName: string, where: string, fields: IFields): string => {
  const newFields = parseFields(fields)
  const values: string[] = []
  for (const key of Object.keys(newFields)) {
    values.push(`${key}=${newFields[key]}`)
  }

  return `UPDATE FROM ${tableName} SET ${values.join(', ')} ${where};`
}