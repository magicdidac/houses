import { Add, Close, Launch } from "@mui/icons-material"
import { AppBar, Button, Dialog, DialogContent, Fab, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useAddHouse } from "../Hooks/Houses"
import { useState } from "react"
import { PersonEdit } from "./PersonEdit"
import { useNotifications } from "@magicdidac/notifications"
import { useMobile } from "../Hooks/Mobile"
import { formatHabitacliaLink } from "../utils"
import { Link } from "react-router-dom"

export const AddHouseButton = () => {
  const addHouse = useAddHouse()
  const isMobile = useMobile()
  const notification = useNotifications()
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState('')
  const [price, setPrice] = useState<number>()
  const [anaRate, setAnaRate] = useState<number | undefined>()
  const [didacRate, setDidacRate] = useState<number | undefined>()
  const [anaNotes, setAnaNotes] = useState<string | undefined>()
  const [didacNotes, setDidacNotes] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  const [duplicatedHouse, setDuplicatedHouse] = useState<number | undefined>()

  const handleClose = () => {
    if (submitting) return

    setOpen(false)
    setLink('')
    setPrice(undefined)
    setAnaRate(undefined)
    setAnaNotes(undefined)
    setDidacRate(undefined)
    setDidacNotes(undefined)
    setDuplicatedHouse(undefined)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    if (link && price) {
      const cleanLink = formatHabitacliaLink(link)
      const finalPrice = (price < 1000) ? price * 1000 : price
      const anaCorrectRate = (!anaRate || anaRate === 0) ? undefined : anaRate
      const didacCorrectRate = (!didacRate || didacRate === 0) ? undefined : didacRate
      const anaCorrectNotes = (!anaNotes || anaNotes.trim() === '') ? undefined : anaNotes
      const didacCorrectNotes = (!didacNotes || didacNotes.trim() === '') ? undefined : didacNotes

      await addHouse.add(cleanLink, finalPrice, anaCorrectRate, anaCorrectNotes, didacCorrectRate, didacCorrectNotes)
      notification.success('¡La casa ha sido añadida con éxito!')
      setSubmitting(false)
      handleClose()
    } else {
      notification.error('Los campos Link y Precio son obligatorios')
      setSubmitting(false)
    }
  }

  const handleDuplicated = async () => {
    if (link !== '') {
      console.log(formatHabitacliaLink(link))
      const houseId = await addHouse.isDuplicated(formatHabitacliaLink(link))
      if (houseId) setDuplicatedHouse(houseId)
    }
  }

  const handleChangeLink = (event: any) => {
    setLink(event.target.value)
    setDuplicatedHouse(undefined)
  }

  return (
    <div>
      <Fab color='secondary' style={{ position: 'fixed', bottom: '1rem', right: '1rem' }} onClick={() => setOpen(true)}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile} style={{ overflowX: 'hidden' }} disableRestoreFocus>
        <AppBar position='relative'>
          <Stack direction='row' justifyContent='space-between' alignItems='center' padding='.5rem 1rem' width='calc(100% - 2rem)'>
            <Typography variant="h6" color='white'>Añadir Casa</Typography>
            <IconButton onClick={handleClose}><Close style={{ color: 'white' }} /></IconButton>
          </Stack>
        </AppBar>
        <DialogContent>
          <Stack gap='1rem'>
            <Stack>
              <TextField
                disabled={submitting}
                autoFocus
                label='Link de la casa'
                value={link}
                onChange={handleChangeLink}
                onBlur={handleDuplicated}
                error={!!duplicatedHouse}
              />
              {!!duplicatedHouse &&
                <Stack direction='row' alignItems='center' gap='.5rem' marginTop='.5rem'>
                  <Typography variant='body2' color='error'>La casa ya existe</Typography>
                  <Link to={`/house/${duplicatedHouse}`}><Launch fontSize="small" color='error' /></Link>
                </Stack>
              }
            </Stack>
            <TextField
              disabled={submitting}
              label='Precio'
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type='number'
            />
            <Stack
              sx={{
                flexDirection: {
                  sm: 'column',
                  md: 'row'
                },
              }}
              gap='1rem'
            >
              <PersonEdit
                disabled={submitting}
                name="Ana"
                rate={anaRate ?? 0}
                onRateChange={(newValue) => setAnaRate(newValue)}
                notes={anaNotes ?? ''}
                onNotesChange={(newValue) => setAnaNotes(newValue)}
              />
              <PersonEdit
                disabled={submitting}
                name="Dídac"
                rate={didacRate ?? 0}
                onRateChange={(newValue) => setDidacRate(newValue)}
                notes={didacNotes ?? ''}
                onNotesChange={(newValue) => setDidacNotes(newValue)}
              />
            </Stack>
          </Stack>
          <Stack alignItems='end' marginTop='1rem'>
            <Button disabled={submitting || !!duplicatedHouse} variant='contained' color='secondary' onClick={handleSubmit}>Aceptar</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div >
  )
}
