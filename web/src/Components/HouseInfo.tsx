import { Button, Container, Dialog, DialogActions, DialogTitle, Stack, Typography } from "@mui/material"
import { PriceDifference } from "./PriceDifference"
import { FieldDisplay } from "./FieldDispaly"
import { HouseRating } from "./HouseRating"
import { getRatingMessage } from "../utils"
import { ShareButton } from "./ShareButton"
import { LinkButton } from "./LinkButton"
import { IHouse } from "../Api/houses/interfaces"
import { Delete } from "@mui/icons-material"
import { CustomIconButton } from "./CustomIconButton"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface IHouseInfoProps {
  house: IHouse
  onDisableHouse: () => Promise<void>
}

export const HouseInfo = ({ house, onDisableHouse }: IHouseInfoProps) => {
  const navigate = useNavigate()
  const [openDisable, setOpenDisable] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleCloseDisable = () => {
    if (submitting) return
    setOpenDisable(false)
  }

  const handleDisable = async () => {
    setSubmitting(true)

    await onDisableHouse()

    setOpenDisable(false)
    setSubmitting(false)
    navigate('/')
  }

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Stack direction='column' gap='1rem'>
        <Stack direction='row' justifyContent='space-between' alignItems='start'>
          <PriceDifference
            alignItems='start'
            price={house.price}
            realPrice={house.realPrice}
          />
          <Stack direction='row' alignItems='center'>
            <LinkButton href={house.link} tooltip="Abrir en habitaclia.com" />
            <ShareButton house={house} />
            <CustomIconButton
              tooltip="Desabilitar Casa"
              icon={<Delete color='secondary' />}
              onClick={() => setOpenDisable(true)}
            />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h5">{house.title}</Typography>
          <Typography variant="body1">({house.location.city})</Typography>
        </Stack>
        <Stack direction='row' gap='1rem'>
          <FieldDisplay value={house.features.area} units={<>m<sup>2</sup></>} />
          {house.features.rooms && <FieldDisplay value={house.features.rooms} units='hab.' />}
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
      <Dialog
        open={openDisable}
        onClose={handleCloseDisable}
      >
        <DialogTitle>¿Seguro que quieres deshabilitar esta casa?</DialogTitle>
        <DialogActions>
          <Button disabled={submitting} variant='outlined' onClick={handleCloseDisable}>Cancelar</Button>
          <Button disabled={submitting} variant='contained' onClick={handleDisable}>Deshabilitar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}