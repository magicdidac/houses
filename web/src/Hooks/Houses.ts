import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { ADD_HOUSE, DISABLE_HOUSE, EDIT_HOUSE, GET_HOUSES, GET_HOUSE_BY_ID, IS_DUPLICATED } from "../Api/houses"
import { IHouse } from "../Api/houses/interfaces"

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

  const [duplicated] = useLazyQuery(IS_DUPLICATED)

  const add = async (link: string, price: number, anaRate?: number, anaNotes?: string, didacRate?: number, didacNotes?: string) => {
    await addHouse({ variables: { link, price, anaRate, anaNotes, didacRate, didacNotes } })
  }

  const isDuplicated = async (link: string): Promise<number | undefined> => {
    const data = await duplicated({ variables: { link } })

    return (data.data && data.data.isDuplicated) ? data.data.isDuplicated : undefined
  }

  return {
    add,
    isDuplicated
  }
}

export const useHouseById = (id: number) => {
  const refetchQueries = [{ query: GET_HOUSES }, { query: GET_HOUSE_BY_ID, variables: { id } }]
  const { data, error, loading } = useQuery(GET_HOUSE_BY_ID, { variables: { id } })
  const [disableHouse] = useMutation(DISABLE_HOUSE, { refetchQueries: [{ query: GET_HOUSES }] })
  const [editHouse] = useMutation(EDIT_HOUSE, { refetchQueries })

  const disable = async () => {
    await disableHouse({ variables: { id } })
  }

  const rate = async (person: Person, rate: number) => {
    if (!data || !data.getHouseById) return

    const importantData = {
      id,
      anaRate: data.getHouseById.ana.rate,
      didacRate: data.getHouseById.didac.rate,
      anaNotes: data.getHouseById.ana.notes,
      didacNotes: data.getHouseById.didac.notes,
    }

    if (person === Person.Ana) {
      await editHouse({ variables: { ...importantData, anaRate: rate } })
    } else {
      await editHouse({ variables: { ...importantData, didacRate: rate } })
    }
  }

  const notes = async (person: Person, notes: string) => {
    if (!data || !data.getHouseById) return

    const importantData = {
      id,
      anaRate: data.getHouseById.ana.rate,
      didacRate: data.getHouseById.didac.rate,
      anaNotes: data.getHouseById.ana.notes,
      didacNotes: data.getHouseById.didac.notes,
    }

    if (person === Person.Ana) {
      await editHouse({ variables: { ...importantData, anaNotes: notes } })
    } else {
      await editHouse({ variables: { ...importantData, didacNotes: notes } })
    }
  }

  return {
    data: (data && data.getHouseById) ? data.getHouseById as IHouse : null,
    error,
    loading,
    disable,
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