import { Stack, Typography } from "@mui/material"

interface IWrongMessageProps {
  message: string
}

export const WrongMessage = ({ message }: IWrongMessageProps) => (
  <Stack alignItems='center' marginTop='25rem'>
    <Typography variant='h4'>{message}</Typography>
  </Stack>
)