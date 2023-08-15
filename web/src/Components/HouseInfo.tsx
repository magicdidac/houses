import { Container, Stack, Typography } from "@mui/material"
import { PriceDifference } from "./PriceDifference"
import { FieldDisplay } from "./FieldDispaly"
import { HouseRating } from "./HouseRating"
import { IHouse } from "../interfaces"
import { getRatingMessage } from "../utils"
import { ShareButton } from "./ShareButton"
import { LinkButton } from "./LinkButton"

interface IHouseInfoProps {
  house: IHouse
}

export const HouseInfo = ({ house }: IHouseInfoProps) => (
  <Container style={{ marginTop: '1rem' }}>
    <Stack direction='column' gap='1rem'>
      <Stack direction='row' justifyContent='space-between' alignItems='start'>
        <PriceDifference
          alignItems='start'
          price={house.price}
          realPrice={house.properties.price}
        />
        <Stack direction='row' alignItems='center'>
          <LinkButton house={house} />
          <ShareButton house={house} />
        </Stack>
      </Stack>
      <Typography variant="h5">{house.properties.title}</Typography>
      <Stack direction='row' gap='1rem'>
        <FieldDisplay value={house.features.area} units={<>m<sup>2</sup></>} />
        {house.features.bedrooms && <FieldDisplay value={house.features.bedrooms} units='hab.' />}
        {house.features.baths && <FieldDisplay value={house.features.baths} units={(house.features.baths > 1) ? 'baños' : 'baño'} />}
      </Stack>
    </Stack>
    <Stack alignItems='end'>
      <HouseRating
        half
        readOnly
        size='large'
        rating={house.globalRate}
        message={getRatingMessage(house)} />
    </Stack>
  </Container>
)