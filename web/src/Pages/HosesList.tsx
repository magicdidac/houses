import { Container, List, Stack, Switch, Typography } from "@mui/material"
import { useHouses } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"
import { HouseItem } from "../Components/HouseItem"
import { AddHouseButton } from "../Components/AddHouseButton"
import { ChangeEvent, useState } from "react"
import { IHouse } from "../interfaces"

export const HousesListPage = () => {
  const houses = useHouses()
  const [byRating, setByRating] = useState(false)

  const handleChangeOrder = (_: ChangeEvent<HTMLElement>, checked: boolean) => {
    setByRating(checked)
  }

  const getHouses = (): IHouse[] => {
    if (!houses.data) return []

    if (!byRating) return houses.data

    let ordered = [...houses.data]
    ordered = ordered.sort((a, b) => {
      if (!a.globalRate && !b.globalRate) return 0
      if (a.globalRate && !b.globalRate) return -1
      if (!a.globalRate && b.globalRate) return 1

      if (a.globalRate && b.globalRate) {
        if ((a.globalRate - b.globalRate) < 0) return 1
        if ((a.globalRate - b.globalRate) > 0) return -1
      }

      return 0
    })

    return ordered
  }

  if (houses.loading || !houses.data) return <CenterLoading label='Loading houses...' />

  return (
    <Container>
      <Stack direction='row' gap='.5rem' justifyContent='end' alignItems='center'>
        <Typography variant="mini">Creación</Typography>
        <Switch color='secondary' onChange={handleChangeOrder} size='small' />
        <Typography variant="mini">Puntuación</Typography>
      </Stack>
      <List >
        {getHouses().map((house) => (
          <HouseItem key={house.id} house={house} />
        ))}
      </List>
      <AddHouseButton />
    </Container>
  )
}