import { Box, Stack, Typography } from "@mui/material"
import { IHouse } from "../interfaces"
import { HouseRating } from "./HouseRating"
import { useNavigate } from "react-router-dom"
import { PriceDifference } from "./PriceDifference"
import { getRatingMessage } from "../utils"

interface IHouseItemProps {
  house: IHouse
}

export const HouseItem = ({ house }: IHouseItemProps) => {
  const navigate = useNavigate()

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
          <PriceDifference
            price={house.price}
            realPrice={house.properties.price}
            titleVariant="h6"
            subtitleVariant="body2"
          />
        </Box>
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
  )
}