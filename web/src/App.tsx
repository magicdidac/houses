import { MyRoutes } from "./routes"
import { Header } from "./Components/Header"

export const App = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '4rem' }}>
        <MyRoutes />
      </div>
    </>
  )
}