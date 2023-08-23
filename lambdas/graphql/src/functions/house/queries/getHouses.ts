import { House } from "../../../__generated__/resolvers-types"
import { callDB } from "../../../database"
import { formatHouses } from "../../../utils"

export default async (): Promise<House[]> => {
  const data = await callDB(`SELECT * FROM Houses WHERE disabled = FALSE ORDER BY id DESC`)

  return formatHouses(data)
}