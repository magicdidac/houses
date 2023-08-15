import { MyRoutes } from "./routes"
import { Header } from "./Components/Header"

export const App = () => (
  <div>
    <Header />
    <div style={{ margin: '2rem 0' }}>
      <MyRoutes />
    </div>
  </div>
)