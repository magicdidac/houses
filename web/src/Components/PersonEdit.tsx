import { Stack, TextField, Typography } from "@mui/material"
import { HouseRating } from "./HouseRating"

interface IPersonEditProps {
  name: string
  rate: number
  onRateChange: (newValue: number) => void
  notes: string
  onNotesChange: (newValue: string) => void
  disabled?: boolean
}

export const PersonEdit = ({ name, rate, notes, onRateChange, onNotesChange, disabled }: IPersonEditProps) => (
  <Stack direction='column' gap='1rem' style={{ border: '#383838 solid 1px', padding: '.5rem', borderRadius: '.25rem' }} justifyContent='space-between'>
    <Stack direction='column' gap='1rem'>
      <Typography variant="h5">{name}</Typography>
      <TextField
        disabled={disabled}
        label='Notas'
        multiline
        rows={4}
        type='text'
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </Stack>
    <Stack alignItems='center'>
      <HouseRating
        disabled={disabled}
        rating={rate}
        message={`${name} no ha puntuado esta casa`}
        onChange={onRateChange}
        size='large'
      />
    </Stack>
  </Stack>
)
