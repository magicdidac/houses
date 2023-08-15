import { Stack } from "@mui/material"
import { CSSProperties } from "react"

interface IImageCroppedProps {
  width: string
  height: string
  src: string
  alt: string
  style?: CSSProperties
}

export const ImageCropped = ({ height, width, alt, src, style }: IImageCroppedProps) => {

  return (
    <Stack justifyContent='center' alignItems='center' width={width} height={height} overflow='hidden' style={style}>
      <img
        alt={alt}
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Stack>
  )
}