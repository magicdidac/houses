import { IconButton, Link, Tooltip } from "@mui/material"
import { OpenInNew } from "@mui/icons-material"
import { IHouse } from "../Api/interfaces"

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
