import { Routes, Route } from "react-router-dom"
import { HousesListPage } from "./Pages/HosesList"
import { HousePage } from "./Pages/House"
import { ImagesPage } from "./Pages/Images"

export const MyRoutes = () => (
    <Routes>
        <Route path='/' element={<HousesListPage />} />
        <Route path="/house/:id" element={<HousePage />} />
        <Route path="/images/:id" element={<ImagesPage />} />
    </Routes>
)
