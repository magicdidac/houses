import { useNavigate, useParams } from "react-router-dom"
import { useHouseById } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"
import { WrongMessage } from "../Components/WrongMessage"
import { useCallback, useEffect, useState } from "react"
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
  const navigate = useNavigate()
  const [imageIndex, setImageIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)

  const changeImage = useCallback((direction: Direction) => {
    if (!house.data) return
    switch (direction) {
      case Direction.Forward:
        if (imageIndex === house.data.images.length - 1) setImageIndex(0)
        else setImageIndex(imageIndex + 1)
        break
      case Direction.Backward:
        if (imageIndex === 0) setImageIndex(house.data.images.length - 1)
        else setImageIndex(imageIndex - 1)
        break
    }
  }, [house.data, imageIndex])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') changeImage(Direction.Forward)
      if (event.key === 'ArrowLeft') changeImage(Direction.Backward)
      if (event.key === 'Escape') navigate(-1)
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [changeImage, navigate])

  const handleTouchStart = (clientX: number) => {
    setTouchStartX(clientX)
  }

  const handleTouchEnd = (touchCurrentX: number) => {
    const deltaX = touchCurrentX - touchStartX

    if (deltaX > 50) {
      changeImage(Direction.Backward)
    } else if (deltaX < -50) {
      changeImage(Direction.Forward)
    }
  }

  if (house.loading) return <CenterLoading label="Loading House..." />
  if (!house.data || house.error) return <WrongMessage message={`La casa con id ${id} no existe...`} />

  return (
    <div
      style={{ margin: '-2rem 0' }}
      onTouchStart={(event) => handleTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
    >
      {isMobile &&
        <Stack
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='calc(100vh - 6rem)'
          gap='1rem'
        >
          <img alt='Imagen de la casa' src={house.data.images[imageIndex]} style={{ width: '100%' }} />
          <Typography variant="body1">Foto {imageIndex + 1}/{house.data.images.length}</Typography>
        </Stack>
      }
      {!isMobile &&
        <Stack alignItems='center' gap='.5rem'>
          <Stack
            height='calc(95vh - 4rem)'
            overflow='hidden'
          >
            <img alt='Imagen de la casa' src={house.data.images[imageIndex]} style={{ height: '100%', objectFit: 'contain' }} />
          </Stack>
          <Typography variant="body1">Foto {imageIndex + 1}/{house.data.images.length}</Typography>
        </Stack>
      }
      <div style={{ width: '49vw', height: '100%', position: 'absolute', top: '0' }} onClick={() => changeImage(Direction.Backward)} />
      <div style={{ width: '49vw', height: '100%', position: 'absolute', top: '0', right: '0' }} onClick={() => changeImage(Direction.Forward)} />
    </div>
  )
}