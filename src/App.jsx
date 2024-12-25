import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Navbar from "./components/ui/Navbar";
import AuthPage from "./pages/AuthPage";
import Fallback from "./pages/Fallback";


const App = () => {
  return (
    <div className="relative min-h-screen bg-grainy bg-cover bg-center selection:bg-yellow-400 selection:text-black">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
