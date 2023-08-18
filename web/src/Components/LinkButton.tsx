import { IconButton, Link, Tooltip } from "@mui/material"
import { OpenInNew } from "@mui/icons-material"

interface ILinkButtonProps {
  href: string
  tooltip?: string
}

export const LinkButton = ({ href, tooltip }: ILinkButtonProps) => (
  <Tooltip title={tooltip ?? 'Abrir link'}>
    <Link href={href} target='_blank' rel="noreferrer">
      <IconButton>
        <OpenInNew color='secondary' />
      </IconButton>
    </Link>
  </Tooltip>
)
