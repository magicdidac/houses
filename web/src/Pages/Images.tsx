import { useParams } from "react-router-dom"
import { useHouseById } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"
import { WrongMessage } from "../Components/WrongMessage"
import { useState } from "react"
import { Stack, Typography } from "@mui/material"
import { useMobile } from "../Hooks/Mobile"

enum Direction {
  Forward,
  Backward
}

export const ImagesPage = () => {
  const { id } = useParams()
  const house = useHouseById(parseInt(id ?? '0'))
  const isMobile = useMobile()
  const [imageIndex, setImageIndex] = useState(0)

  const changeImage = (direction: Direction) => {
    if (!house.data) return
    switch (direction) {
      case Direction.Forward:
        if (imageIndex === house.data.images.gallery.length - 1) setImageIndex(0)
        else setImageIndex(imageIndex + 1)
        break
      case Direction.Backward:
        if (imageIndex === 0) setImageIndex(house.data.images.gallery.length - 1)
        else setImageIndex(imageIndex - 1)
        break
    }
  }

  if (house.loading) return <CenterLoading label="Loading House..." />
  if (!house.data || house.error) return <WrongMessage message={`La casa con id ${id} no existe...`} />

  return (
    <div style={{ margin: '-2rem 0' }}>
      {isMobile &&
        <Stack
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='calc(100vh - 6rem)'
          gap='1rem'
        >
          <img alt='Imagen de la casa' src={house.data.images.gallery[imageIndex].big} style={{ width: '100%' }} />
          <Typography variant="body1">Foto {imageIndex + 1}/{house.data.images.gallery.length}</Typography>
        </Stack>
      }
      {!isMobile &&
        <Stack
          height='calc(100vh - 4rem)'
          overflow='hidden'
        >
          <img alt='Imagen de la casa' src={house.data.images.gallery[imageIndex].big} style={{ height: '100%', objectFit: 'contain' }} />
        </Stack>
      }
      <div style={{ width: '49vw', height: '100%', position: 'absolute', top: '0' }} onClick={() => changeImage(Direction.Backward)} />
      <div style={{ width: '49vw', height: '100%', position: 'absolute', top: '0', right: '0' }} onClick={() => changeImage(Direction.Forward)} />
    </div>
  )
}