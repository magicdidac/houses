import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}