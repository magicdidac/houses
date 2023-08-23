import { Stack, Typography } from "@mui/material"
import { IHouseLocation } from "../Api/houses/interfaces"
import { IPersonLocation } from "../constants"
import { LinkButton } from "./LinkButton"
import { createMapsRouteLink } from "../utils"

interface IPersonCarProps {
  person: IPersonLocation
  house: IHouseLocation
  duration: string
}

export const PersonCar = ({ person, house, duration }: IPersonCarProps) => {
  return (
    <Stack direction='row' alignItems='center'>
      <Typography variant="h6">{person.name} ({duration})</Typography>
      <LinkButton href={createMapsRouteLink(house, person)} tooltip="Abrir en GoogleMaps" />
    </Stack>
  )
}