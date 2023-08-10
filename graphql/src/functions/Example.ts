import { callDB } from "../database"

export const getExample = async () => {
  const data = await callDB('SELECT * FROM Table')

  return data
}