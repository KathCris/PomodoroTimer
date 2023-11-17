import { Routes, Route } from "react-router-dom"
import { Home } from "./components/Home"
import { History } from "./components/History"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}