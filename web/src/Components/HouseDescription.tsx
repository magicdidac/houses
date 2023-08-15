import { Download } from "@mui/icons-material"
import { Button, Container, Stack, Typography } from "@mui/material"
import { IHouse } from "../interfaces"
import { useState } from "react"

interface IHouseDescriptionProps {
  house: IHouse
}

const linearGradient = 'linear-gradient(#000, rgba(0,0,0,0))'

export const HouseDescription = ({ house }: IHouseDescriptionProps) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <div onClick={() => setShowMore(true)} style={{ cursor: (showMore) ? 'default' : 'pointer' }}>
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h6">Descripción</Typography>
        <div style={{ maxHeight: (showMore) ? '100%' : '200px', overflow: 'hidden', maskImage: (showMore) ? 'none' : linearGradient, WebkitMaskImage: (showMore) ? 'none' : linearGradient }}>
          <Typography variant="body1" textAlign='justify' sx={{ whiteSpace: 'pre-line' }}>{house.properties.description}</Typography>
        </div>
        {!showMore && <Stack alignItems='center'>
          <div>
            <Button size="small" variant='outlined' color='secondary'><Download /> Leer más</Button>
          </div>
        </Stack>}
      </Container>
    </div>
  )
}