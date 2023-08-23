import { MutationDisableHouseArgs } from "../../../__generated__/resolvers-types"
import { callDB } from "../../../database"
import { update } from "../../../utils"

export default async ({ id }: MutationDisableHouseArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { disabled: true }))

  return true
}