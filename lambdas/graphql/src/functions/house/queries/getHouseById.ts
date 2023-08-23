import { House, QueryGetHouseByIdArgs } from "../../../__generated__/resolvers-types"
import { callDB } from "../../../database"
import { formatHouses } from "../../../utils"

export default async ({ id }: QueryGetHouseByIdArgs): Promise<House> => {
  const data = await callDB(`SELECT * FROM Houses WHERE id = ${id}`)
  return formatHouses(data)[0]
}