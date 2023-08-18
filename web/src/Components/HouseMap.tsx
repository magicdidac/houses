import { Container, Link, Stack, Typography } from "@mui/material"
import { IHouse } from "../Api/interfaces"
import { createMapsPlaceLink } from "../utils"
import { PersonCar } from "./PersonCar"
import { AnaHouse, DidacHouse } from "../constants"
import { useMobile } from "../Hooks/Mobile"

interface IHouseMapProps {
  house: IHouse
}

export const HouseMap = ({ house }: IHouseMapProps) => {
  const isMobile = useMobile()

  return (
    <Container>
      <Typography variant="h5">Mapa</Typography>
      <Stack
        sx={{
          flexDirection: {
            sm: 'column',
            md: 'row-reverse'
          }
        }}
        justifyContent='space-between'
        gap='1rem'
      >
        <Link
          sx={{
            width: {
              sm: '100%',
              md: 'calc(75% - 1rem)'
            }
          }}
          href={createMapsPlaceLink(house.location)}
          target='_blank'
          rel='noreferrer'
        >
          <img alt="Mapa de donde está la casa" src={house.mapImage} width='100%' />
        </Link>
        <Stack
          direction={isMobile ? 'row' : 'column'}
        >
          <PersonCar person={AnaHouse} house={house.location} duration={house.ana.carDuration} />
          <PersonCar person={DidacHouse} house={house.location} duration={house.didac.carDuration} />
        </Stack>
      </Stack>
    </Container>
  )
}