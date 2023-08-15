import { useMutation, useQuery } from "@apollo/client"
import { ADD_HOUSE, ANA_NOTES, ANA_RATE, DIDAC_NOTES, DIDAC_RATE, EDIT_HOUSE, GET_HOUSES, GET_HOUSE_BY_ID } from "../Api/Houses"
import { IHouse } from "../interfaces"

enum Person {
  Ana,
  Didac
}

export const useHouses = () => {
  const { data, error, loading, refetch } = useQuery(GET_HOUSES)

  return {
    data: (data && data.getHouses) ? data.getHouses as IHouse[] : null,
    error,
    loading,
    refetch
  }
}

export const useAddHouse = () => {
  const [addHouse] = useMutation(ADD_HOUSE, {
    refetchQueries: [{ query: GET_HOUSES }]
  })

  const add = async (link: string, price: number, anaRate?: number, anaNotes?: string, didacRate?: number, didacNotes?: string) => {
    await addHouse({ variables: { link, price, anaRate, anaNotes, didacRate, didacNotes } })
  }

  return add
}

export const useHouseById = (id: number) => {
  const refetchQueries = [{ query: GET_HOUSES }, { query: GET_HOUSE_BY_ID, variables: { id } }]
  const { data, error, loading } = useQuery(GET_HOUSE_BY_ID, { variables: { id } })
  const [editHouse] = useMutation(EDIT_HOUSE, { refetchQueries })
  const [anaRate] = useMutation(ANA_RATE, { refetchQueries })
  const [anaNotes] = useMutation(ANA_NOTES, { refetchQueries })
  const [didacRate] = useMutation(DIDAC_RATE, { refetchQueries })
  const [didacNotes] = useMutation(DIDAC_NOTES, { refetchQueries })

  const edit = async (link: string, price: number) => {
    await editHouse({ variables: { link, price } })
  }

  const rate = async (person: Person, rate: number) => {
    if (person === Person.Ana) {
      await anaRate({ variables: { id, rate } })
    } else {
      await didacRate({ variables: { id, rate } })
    }
  }

  const notes = async (person: Person, notes: string) => {
    if (person === Person.Ana) {
      await anaNotes({ variables: { id, notes } })
    } else {
      await didacNotes({ variables: { id, notes } })
    }
  }

  return {
    data: (data && data.getHouseById) ? data.getHouseById as IHouse : null,
    error,
    loading,
    edit,
    ana: {
      rate: async (value: number) => await rate(Person.Ana, value),
      notes: async (value: string) => await notes(Person.Ana, value)
    },
    didac: {
      rate: async (value: number) => await rate(Person.Didac, value),
      notes: async (value: string) => await notes(Person.Didac, value)
    }
  }
}