import { MutationEditHouseArgs } from "../../../__generated__/resolvers-types"
import { callDB } from "../../../database"
import { update } from "../../../utils"

export default async ({ id, anaRate, anaNotes, didacRate, didacNotes }: MutationEditHouseArgs): Promise<boolean> => {
  await callDB(update('Houses', `id=${id}`, { anaRate, anaNotes, didacRate, didacNotes }))

  return true
}