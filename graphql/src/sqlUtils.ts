

export const insert = (fields: { [key: string]: string | number }): string => {
  let query = 'INSERT INTO Houses ('
  query += Object.keys(fields).join(' ,')
  query += ') VALUES ('
  query += Object.values(fields).join(' ,')
  query += ')'

  return query
}