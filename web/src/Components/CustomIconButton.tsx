import { IconButton, Tooltip } from "@mui/material"

interface ICustomIconButtonProps {
  tooltip?: string
  icon: JSX.Element
  onClick: () => void
}

export const CustomIconButton = ({ tooltip, icon, onClick }: ICustomIconButtonProps) => (
  <Tooltip title={tooltip ?? ''}>
    <IconButton onClick={onClick}>{icon}</IconButton>
  </Tooltip>
)