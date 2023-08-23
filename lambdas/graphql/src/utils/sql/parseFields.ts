import { IFields } from "./interfaces"

export default (fields: IFields): IFields => {
  const newFields = { ...fields }
  for (const key of Object.keys(newFields)) {
    if (typeof newFields[key] === 'string') newFields[key] = `"${newFields[key]}"`
    if (typeof newFields[key] === 'boolean') newFields[key] = newFields[key] ? 'TRUE' : 'FALSE'
    if (!newFields[key]) newFields[key] = 'NULL'
  }
  return newFields
}