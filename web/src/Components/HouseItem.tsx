import { Box, Stack, Typography } from "@mui/material"
import { IHouse } from "../interfaces"
import { HouseRating } from "./HouseRating"
import { useNavigate } from "react-router-dom"

interface IHouseItemProps {
  house: IHouse
}

export const HouseItem = ({ house }: IHouseItemProps) => {
  const navigate = useNavigate()

  const getDisclaimer = (): string => {
    if (!house.anaRate) {
      if (!house.didacRate) {
        return 'No habeis puntuado esta casa'
      }
      return 'Ana no ha puntuado esta casa'
    }
    if (!house.didacRate) {
      return 'Dídac no ha puntuado esta casa'
    }
    return ''
  }

  return (
    <Stack
      sx={{
        flexDirection: {
          sm: 'column',
          md: 'row'
        },
        alignItems: {
          sm: 'start',
          md: 'stretch'
        }
      }}
      bgcolor='#fff'
      marginBottom='4rem'
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/house/${house.id}`)}
    >
      <Box
        sx={{
          maxWidth: {
            sm: '100%',
            md: '350px',
            xl: '400px'
          }
        }}
        display='inherit'
      >
        <img alt="banner-xl" src={house.properties.banner} style={{ height: '100%', width: '100%' }} />
      </Box>
      <Stack direction='column' padding='1rem' width='calc(100% - 2rem)' justifyContent='space-between'>
        <Box>
          <Typography variant='h6'>{house.properties.title}</Typography>
          <Typography variant='body1'>{house.properties.price}</Typography>
        </Box>
        <Stack alignItems='end'>
          <HouseRating
            rating={house.globalRate}
            readOnly
            size='large'
            discalimer={getDisclaimer()}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}