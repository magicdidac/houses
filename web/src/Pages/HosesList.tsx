import { Container, List, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useHouses } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"
import { HouseItem } from "../Components/HouseItem"
import { AddHouseButton } from "../Components/AddHouseButton"
import { MouseEvent, useState } from "react"
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"
import { IHouse } from "../Api/interfaces"

export const HousesListPage = () => {
  const houses = useHouses()
  const [byRating, setByRating] = useState(false)
  const [onlyWithout, setOnlyWithout] = useState(false)

  const handleChangeOrder = (_: MouseEvent<HTMLElement>, value: boolean) => {
    setByRating(value)
  }

  const getHouses = (): IHouse[] => {
    if (!houses.data) return []
    let ordered = [...houses.data]

    if (onlyWithout) {
      ordered = ordered.filter((house) => (!house.ana.rate || !house.didac.rate))
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
          {onlyWithout && <CheckBox color='secondary' />}
          {!onlyWithout && <CheckBoxOutlineBlank />}
          <Typography style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }} variant="body1">Sin puntuar</Typography>
        </Stack>
        <ToggleButtonGroup
          color='secondary'
          value={byRating}
          exclusive
          onChange={handleChangeOrder}
          size='small'
        >
          <ToggleButton value={false}>Creación</ToggleButton>
          <ToggleButton value={true}>Puntuación</ToggleButton>
        </ToggleButtonGroup>
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