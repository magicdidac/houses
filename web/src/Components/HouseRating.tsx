import { Cottage, CottageOutlined } from '@mui/icons-material'
import { Rating, Stack, Typography, styled } from '@mui/material'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#f60'
  }
})

interface IHouseRatingProps {
  rating?: number
  onChange?: (newValue: number) => void
  readOnly?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  discalimer?: string
}

export const HouseRating = ({ rating, onChange, readOnly, disabled, size, discalimer }: IHouseRatingProps) => {

  const handleChange = (newValue: number | null) => {
    if (onChange) {
      onChange(newValue ?? 0)
    }
  }

  return (
    <Stack direction='column' alignItems='center' gap='.5rem' maxWidth='150px'>
      <Typography variant='mini' align='center'>{discalimer}</Typography>
      <StyledRating
        size={size}
        value={rating}
        readOnly={readOnly}
        disabled={disabled}
        onChange={(_, newValue) => handleChange(newValue)}
        icon={<Cottage fontSize='inherit' />}
        emptyIcon={<CottageOutlined fontSize='inherit' />}
      />
    </Stack>
  )
}