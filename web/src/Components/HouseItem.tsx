import { Box, Stack, Typography } from "@mui/material"
import { HouseRating } from "./HouseRating"
import { PriceDifference } from "./PriceDifference"
import { getRatingMessage } from "../utils"
import { IHouse } from "../Api/interfaces"
import { Link } from 'react-router-dom'

interface IHouseItemProps {
  house: IHouse
}

export const HouseItem = ({ house }: IHouseItemProps) => {

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/house/${house.id}`}
    >
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
          <img alt="banner-xl" src={house.images[0]} style={{ height: '100%', width: '100%' }} />
        </Box>
        <Stack direction='column' padding='1rem' width='calc(100% - 2rem)' justifyContent='space-between' gap='1rem'>
          <Stack direction='row' justifyContent='space-between' gap='1rem'>
            <Box>
              <Typography variant='h6'>{house.title}</Typography>
              <Typography variant="body1">({house.location.city})</Typography>
            </Box>
            <PriceDifference
              price={house.price}
              realPrice={house.realPrice}
              titleVariant="h6"
              subtitleVariant="body2"
            />
          </Stack>
          <Stack alignItems='end'>
            <HouseRating
              half
              readOnly
              size='large'
              rating={house.globalRate}
              message={getRatingMessage(house)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Link>
  )
}