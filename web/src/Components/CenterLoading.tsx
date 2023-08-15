import { CircularProgress, Stack, Typography } from "@mui/material"

interface ICenterLoadingProps {
  label?: string
}

export const CenterLoading = ({ label }: ICenterLoadingProps) => (
  <Stack direction='column' height='80vh' alignItems='center' justifyContent='center' gap='2rem'>
    <CircularProgress size='5rem' />
    <Typography variant='h6'>{label}</Typography>
  </Stack>
)
