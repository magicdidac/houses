import { Container, Stack } from "@mui/material"
import { PersonDisplay } from "./PersonDisplay"
import { useState } from "react"
import { IPersonFunctions } from "../interfaces"
import { IHouse } from "../Api/interfaces"

interface IHousePeopleProps {
  house: IHouse
  ana: IPersonFunctions
  didac: IPersonFunctions
}

export const HousePeople = ({ house, didac, ana }: IHousePeopleProps) => {
  const [submitting, setSubmitting] = useState(false)

  const changeRating = async (value: number, cb: (value: number) => Promise<void>) => {
    setSubmitting(true)
    await cb(value)
    setSubmitting(false)
  }

  const changeNotes = async (value: string, cb: (value: string) => Promise<void>) => {
    setSubmitting(true)
    await cb(value)
    setSubmitting(false)
  }

  return (
    <Container>
      <Stack
        sx={{
          flexDirection: {
            sm: 'column',
            md: 'row'
          },
          justifyContent: {
            sm: 'center',
            md: 'space-between'
          }
        }}

        style={{ marginTop: '2rem' }}
        gap='2rem'
      >
        <PersonDisplay
          name="Ana"
          disabled={submitting}
          notes={house.ana.notes}
          rate={house.ana.rate}
          onChangeRate={(value: number) => changeRating(value, ana.rate)}
          onChangeNotes={(value: string) => changeNotes(value, ana.notes)}
        />
        <PersonDisplay
          name="Dídac"
          disabled={submitting}
          notes={house.didac.notes}
          rate={house.didac.rate}
          onChangeRate={(value: number) => changeRating(value, didac.rate)}
          onChangeNotes={(value: string) => changeNotes(value, didac.notes)}
        />
      </Stack>
    </Container>
  )
}