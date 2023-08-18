import { MyRoutes } from "./routes"
import { Header } from "./Components/Header"
import { NotificationProvider, PositionX, PositionY } from "@magicdidac/notifications"
import { useMobile } from "./Hooks/Mobile"

export const App = () => {
  const isMobile = useMobile()

  return (
    <NotificationProvider positionY={PositionY.top} positionX={isMobile ? PositionX.center : PositionX.right} width={isMobile ? '75vw' : '400px'}>
      <Header />
      <div style={{ margin: '2rem 0' }}>
        <MyRoutes />
      </div>
    </NotificationProvider>
  )
}