import  { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Navbar from "./components/ui/Navbar";
import AuthPage from "./pages/AuthPage";
import Fallback from "./pages/Fallback";
import ProtectedPage from "./pages/ProtectedPage";
import { Toaster } from "react-hot-toast";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import LoadingScreen from "./components/ui/LoadingScreen";
import Collaborators from "./pages/Collaborators";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/protected/get-details`,
          { credentials: "include" } // Ensures cookies are sent
        );
        console.log(await response.json()); // Log response to debug
        setIsAuthenticated(response.ok); // True if response is OK
      } catch (error) {
        console.error("Failed to fetch auth status:", error);
        setIsAuthenticated(false); // Default to unauthenticated on error
      } finally {
        setLoading(false); // Done loading regardless of success or failure
      }
    };
    fetchAuthStatus();
  }, []);
  
  const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
    if (loading) {
      return (
        <LoadingScreen />
      ); // Placeholder,  spinner 
    }
    if (!isAuthenticated) {
      return <Navigate to="/register" replace />;
    }
    return children; // Render the protected content
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

      <div className="relative min-h-screen bg-black text-white">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<AuthPage />} />
            {/* <Route path="/collaborators" element={<Collaborators />} /> */}
            <Route
              path="/protected"
              element={
                    <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>

                  <ProtectedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>

                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>

                  <Dashboard />
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
