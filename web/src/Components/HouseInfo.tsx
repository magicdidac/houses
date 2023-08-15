import { Container, Stack, Typography } from "@mui/material"
import { PriceDifference } from "./PriceDifference"
import { FieldDisplay } from "./FieldDispaly"
import { HouseRating } from "./HouseRating"
import { IHouse } from "../interfaces"
import { getDisclamer } from "../utils"

interface IHouseInfoProps {
  house: IHouse
}

export const HouseInfo = ({ house }: IHouseInfoProps) => {

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Stack direction='column' gap='1rem'>
        <PriceDifference
          alignItems='start'
          price={house.price}
          realPrice={house.properties.price}
        />
        <Typography variant="h5">{house.properties.title}</Typography>
        <Stack direction='row' gap='1rem'>
          <FieldDisplay value={house.features.area} units={<p>m<sup>2</sup></p>} />
          {house.features.bedrooms && <FieldDisplay value={house.features.bedrooms} units='hab.' />}
          {house.features.baths && <FieldDisplay value={house.features.baths} units={(house.features.baths > 1) ? 'baños' : 'baño'} />}
        </Stack>
      </Stack>
      <Stack alignItems='end'>
        <HouseRating rating={house.globalRate} readOnly size='large' discalimer={getDisclamer(house)} />
      </Stack>
    </Container>
  )
}