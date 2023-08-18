import { Stack, Typography } from "@mui/material"
import { TypographyVariant } from '@mui/material/styles'
import { formatCurrency } from "../utils"
import { Download, ImportExport, Upload } from "@mui/icons-material"

interface IPriceDifferenceProps {
  price: number
  realPrice: number
  alignItems?: string
  titleVariant?: TypographyVariant
  subtitleVariant?: TypographyVariant
}

export const PriceDifference = ({ price, realPrice, alignItems, titleVariant, subtitleVariant }: IPriceDifferenceProps) => {

  const getRealPrice = () => {
    const difference = price - realPrice

    if (difference === 0) {
      return (
        <Stack direction='row' gap='.5rem'>
          <ImportExport fontSize='small' style={{ color: 'grey' }} />
          <Typography variant={subtitleVariant ?? 'body1'} noWrap color='grey'>{formatCurrency(realPrice)}</Typography>
        </Stack>
      )
    } else if (difference > 0) {
      return (
        <Stack direction='row' gap='.5rem'>
          <Download fontSize='small' style={{ color: 'green' }} />
          <Typography variant={subtitleVariant ?? 'body1'} noWrap color='green'>{formatCurrency(realPrice)}</Typography>
        </Stack>
      )
    } else {
      return (
        <Stack direction='row' gap='.5rem'>
          <Upload fontSize='small' style={{ color: 'red' }} />
          <Typography variant={subtitleVariant ?? 'body1'} noWrap color='red'>{formatCurrency(realPrice)}</Typography>
        </Stack>
      )
    }

  }

  return (
    <Stack alignItems={alignItems ?? 'end'}>
      <Typography variant={titleVariant ?? 'h2'} noWrap>{formatCurrency(price)}</Typography>
      {getRealPrice()}
    </Stack>
  )
}