import { IconButton, Link, Tooltip } from "@mui/material"
import { IHouse } from "../interfaces"
import { OpenInNew } from "@mui/icons-material"

interface ILinkButtonProps {
  house: IHouse
}

export const LinkButton = ({ house }: ILinkButtonProps) => (
  <Tooltip title='Abrir en habitaclia.com'>
    <Link href={house.link} target='_blank' rel="noreferrer">
      <IconButton>
        <OpenInNew color='secondary' />
      </IconButton>
    </Link>
  </Tooltip>
)