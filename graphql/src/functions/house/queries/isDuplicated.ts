import { QueryIsDuplicatedArgs } from "../../../__generated__/resolvers-types"
import { callDB } from "../../../database"

export default async ({ link }: QueryIsDuplicatedArgs): Promise<number | undefined> => {
  const houses = await callDB(`SELECT id FROM Houses WHERE disabled = FALSE AND link = "${link}"`)

  return (houses.length === 0) ? undefined : houses[0].id
}