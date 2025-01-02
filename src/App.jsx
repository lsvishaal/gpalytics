import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Navbar from "./components/ui/Navbar";
import AuthPage from "./pages/AuthPage";
import Fallback from "./pages/Fallback";
import ProtectedPage from "./pages/ProtectedPage";
import FileUploadDemo from "./pages/FileUploadPage";
import { Toaster } from "react-hot-toast";

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
    if (!isAuthenticated) {
      return <Navigate to="/register" replace />;
    }
    return children;
  };

  return (
    <>
      {/* Toaster mounted globally and only once */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "14px",
            duration: 8000,
            zIndex: 9999,
          },
          success: {
            style: {
              background: "#4caf50",
              color: "#fff",
            },
            iconTheme: {
              primary: "#4caf50",
              secondary: "#fff",  
            },
          },
          error: {
            style: {
              background: "#f44336",
              color: "#fff",
            },
            iconTheme: {
              primary: "#f44336",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProtectedPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Fallback />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
