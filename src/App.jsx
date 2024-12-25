import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Landing"
import Navbar from "./components/ui/Navbar"
import AuthPage from "./components/ui/Registration"

const App = () => {
  return (
    <div className="relative min-h-screen bg-grainy bg-cover bg-center">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
