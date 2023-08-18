import { useNavigate, useParams } from "react-router-dom"
import { useHouseById } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"
import { ImageCropped } from "../Components/ImageCropped"
import { HouseDescription } from "../Components/HouseDescription"
import { HouseInfo } from "../Components/HouseInfo"
import { WrongMessage } from "../Components/WrongMessage"
import { Stack } from "@mui/material"
import { HousePeople } from "../Components/HousePeople"
import { HouseMap } from "../Components/HouseMap"

export const HousePage = () => {
  const { id } = useParams()
  const house = useHouseById(parseInt(id ?? '0'))
  const navigate = useNavigate()

  if (house.loading) return <CenterLoading label="Loading House..." />
  if (!house.data || house.error) return <WrongMessage message={`La casa con id ${id} no existe...`} />

  return (
    <div style={{ marginTop: '-2rem' }}>
      <div style={{ paddingBottom: '2rem', background: '#fff' }}>
        <ImageCropped
          alt='Imagen de la casa'
          src={house.data.images[0]}
          width='100vw' height='50vh'
          style={{ cursor: 'zoom-in' }}
          onClick={() => navigate(`/images/${id}`)}
        />
        <HouseInfo house={house.data} onDisableHouse={house.disable} />
      </div>
      <Stack alignItems='center' >
        <Stack
          gap='1rem'
          sx={{
            maxWidth: {
              sm: '100%',
              md: '75vw'
            }
          }}
        >
          <HouseDescription house={house.data} />
          <HousePeople house={house.data} ana={house.ana} didac={house.didac} />
          <HouseMap house={house.data} />
        </Stack>
      </Stack>
    </div>
  )
}