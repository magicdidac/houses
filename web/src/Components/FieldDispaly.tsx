import { Stack, Typography, TypographyVariant } from "@mui/material"

interface IFieldDisplayProps {
  value: string | number | JSX.Element
  units: string | JSX.Element
  variant?: TypographyVariant
}

export const FieldDisplay = ({ value, units, variant }: IFieldDisplayProps) => (
  <Stack direction='row' gap='.25rem' alignItems='end'>
    <Typography variant={variant ?? 'body1'} fontWeight='bold'>{value}</Typography>
    <Typography variant={variant ?? 'body1'}>{units}</Typography>
  </Stack>
)
