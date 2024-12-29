import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Navbar from "./components/ui/Navbar";
import AuthPage from "./pages/AuthPage";
import Fallback from "./pages/Fallback";
import ProtectedPage from "./pages/ProtectedPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/protected/get-details`,
          { credentials: "include" }
        );
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };
    fetchAuthStatus();
  }, []);

  const ProtectedRoute = ({ isAuthenticated, children }) => {
    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/register" replace />;
    }
  
    // If authenticated, render the children (protected components)
    return children;
  };
  return (
    <div className="relative min-h-screen bg-grainy bg-cover bg-center selection:bg-yellow-400 selection:text-black">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" 
          element={
            <LandingPage />
            
            } />
          <Route path="/register" element={<AuthPage />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProtectedPage /> {/* Replace with your protected page */}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Fallback />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
