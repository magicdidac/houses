import { useParams } from "react-router-dom"
import { useHouseById } from "../Hooks/Houses"
import { CenterLoading } from "../Components/CenterLoading"


export const HousePage = () => {
  const { id } = useParams()
  const house = useHouseById(parseInt(id ?? '0'))

  if (house.loading || !house.data) return <CenterLoading label="Loading House..." />

  return (
    <div>
      {house.data.properties.title}
    </div>
  )
}