import { Button, Dialog, DialogActions, DialogContent, IconButton, Stack, TextField, Typography } from "@mui/material"
import { HouseRating } from "./HouseRating"
import { Edit } from "@mui/icons-material"
import { useState } from "react"

interface IPersonDisplayProps {
  notes?: string
  rate?: number
  disabled?: boolean
  name: string
  onChangeRate: (value: number) => Promise<void>
  onChangeNotes: (value: string) => Promise<void>
}

export const PersonDisplay = ({ notes, rate, name, disabled, onChangeRate, onChangeNotes }: IPersonDisplayProps) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [newNotes, setNewNotes] = useState('')

  const openDialog = () => {
    setNewNotes(notes ?? '')
    setOpenEdit(true)
  }

  const closeDialog = () => {
    if (!disabled)
      setOpenEdit(false)
  }

  const onEditNotes = async () => {
    await onChangeNotes(newNotes)
    setOpenEdit(false)
  }

  return (
    <Stack
      direction='column'
      gap='1rem'
      justifyContent='space-between'
      style={{
        border: '#383838 solid 1px',
        padding: '.5rem',
        borderRadius: '.25rem',
        minHeight: '200px'
      }}

      sx={{
        width: {
          sm: '100%',
          md: '30vw'
        },
        maxWidth: {
          sm: '100%',
          md: '30vw'
        }
      }}
    >
      <Stack direction='column' gap='1rem'>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant="h5">{name}</Typography>
          <IconButton disabled={disabled} size="small" onClick={openDialog}><Edit fontSize="small" /></IconButton>
        </Stack>
        <Typography
          variant="body1"
          textAlign='justify'
          sx={{ whiteSpace: 'pre-line' }}
        >
          {notes}
        </Typography>
      </Stack>
      <HouseRating
        rating={rate}
        disabled={disabled}
        message={`${name} no ha puntuado esta casa`}
        onChange={onChangeRate}
      />
      <Dialog
        open={openEdit}
        disableRestoreFocus
        onClose={closeDialog}
        fullWidth
      >
        <DialogContent>
          <Stack>
            <TextField
              autoFocus
              disabled={disabled}
              value={newNotes}
              onChange={(event) => setNewNotes(event.target.value)}
              multiline
              rows={10}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={disabled} variant='text' color='secondary' onClick={closeDialog}>Cancelar</Button>
          <Button disabled={disabled} variant='contained' color='secondary' onClick={onEditNotes}>Editar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}