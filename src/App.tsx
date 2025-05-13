import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import RoadmapDetail from "./pages/RoadmapDetail"
import CreateRoadmap from "./pages/CreateRoadmap"

export default function App() {
  const token = localStorage.getItem("token")
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
  path="/dashboard"
  element={
    localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/" />
  }
/>
        <Route path="/roadmap/:id" element={token ? <RoadmapDetail /> : <Navigate to="/" />} />
        <Route path="/create" element={token ? <CreateRoadmap /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
