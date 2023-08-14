import { Container, List, Stack, Switch, Typography } from "@mui/material"
import { useHouses } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"
import { HouseItem } from "../Components/HouseItem"
import { AddHouseButton } from "../Components/AddHouseButton"
import { ChangeEvent, useState } from "react"
import { IHouse } from "../interfaces"
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"

export const HousesListPage = () => {
  const houses = useHouses()
  const [byRating, setByRating] = useState(false)
  const [onlyWithout, setOnlyWithout] = useState(false)

  const handleChangeOrder = (_: ChangeEvent<HTMLElement>, checked: boolean) => {
    setByRating(checked)
  }

  const getHouses = (): IHouse[] => {
    if (!houses.data) return []
    let ordered = [...houses.data]

    if (onlyWithout) {
      ordered = ordered.filter((house) => (!house.anaRate || !house.didacRate))
    }

    if (!byRating) return ordered

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
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' alignItems='center' gap='.5rem' style={{ cursor: 'pointer' }} onClick={() => setOnlyWithout(!onlyWithout)}>
          {onlyWithout && <CheckBox fontSize='small' color='secondary' />}
          {!onlyWithout && <CheckBoxOutlineBlank fontSize='small' />}
          <Typography style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }} variant="mini">Sin puntuar</Typography>
        </Stack>
        <Stack direction='row' gap='.5rem' alignItems='center'>
          <Typography variant="mini">Creación</Typography>
          <Switch color='secondary' onChange={handleChangeOrder} size='small' />
          <Typography variant="mini">Puntuación</Typography>
        </Stack>
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