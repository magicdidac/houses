import { Share } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { IHouse } from "../interfaces"
import { useNotifications } from "@magicdidac/notifications"
import { useMobile } from "../Hooks/Mobile"

interface IShareButtonProps {
  house: IHouse
  size?: 'small' | 'medium' | 'large'
}

export const ShareButton = ({ house, size }: IShareButtonProps) => {
  const notifications = useNotifications()
  const isMobile = useMobile()

  const handleClick = () => {
    const url = `https://house.magicdidac.com/house/${house.id}`
    if (isMobile) {
      navigator.share({
        title: house.properties.title,
        url
      })
    } else {
      navigator.clipboard.writeText(url)
      notifications.info('Link copiado en el portapapeles')
    }
  }

  return (
    <IconButton
      size={size}
      onClick={handleClick}
    >
      <Share color='secondary' fontSize={size} />
    </IconButton>
  )
}