import { Routes, Route } from "react-router-dom"
import { HousesListPage } from "./Pages/HosesList"
import { HousePage } from "./Pages/House"

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HousesListPage />} />
            <Route path="/house/:id" element={<HousePage />} />
        </Routes>
    )
}