import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RandomAvatar } from "react-random-avatars";

const Navbar = () => {
  const [user, setUser] = useState(null); // State for logged-in user
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Fetch user details
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/protected/get-details`, {
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Update user state with fetched data
      } else {
        setUser(null); // Clear user state if not logged in
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  // Re-fetch user data on component mount or when the user state changes
  useEffect(() => {
    fetchUserData(); // Fetch user details on mount
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        setUser(null); // Clear user state after logout
        navigate("/register");
      } else {
        console.error("Error during logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-b from-black/80 to-black/30 backdrop-blur-md text-base-content px-6 py-4 shadow-md z-50 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="text-xl font-bold flex items-center space-x-2">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c2.5 0 4 1.5 4 4s-1.5 4-4 4-4-1.5-4-4 1.5-4 4-4zm0 0C8.5 8 6 6.5 6 4.5S8.5 1 12 1s6 2 6 3.5S15.5 8 12 8z"
            />
          </svg>
        </span>
        <span>
          <span className="text-primary">GPA</span>lytics
        </span>
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <a
          onClick={() => navigate("/")}
          className="cursor-pointer text-gray-300 hover:text-primary transition-all duration-300 hover:underline hover:scale-105"
        >
          Home
        </a>
        {user ? (
          <a
            onClick={() => navigate("/upload")}
            className="cursor-pointer text-gray-300 hover:text-primary transition-all duration-300 hover:underline hover:scale-105"
          >
            Upload
          </a>
        ) : (
          <a
            onClick={() => navigate("/register")}
            className="cursor-pointer text-gray-300 hover:text-primary transition-all duration-300 hover:underline hover:scale-105"
          >
            Register
          </a>
        )}
         <a
    onClick={() => navigate("/dashboard")}
    className="cursor-pointer text-gray-300 hover:text-primary transition-all duration-300 hover:underline hover:scale-105"
  >
    Dashboard
  </a>
        <a
          onClick={() => navigate("/#collaborators")}
          className="cursor-pointer text-gray-300 hover:text-primary transition-all duration-300 hover:underline hover:scale-105"
        >
          Collaborators
        </a>
        <a
          onClick={() => navigate("/#about")}
          className="cursor-pointer text-gray-300 hover:text-primary transition-all duration-300 hover:underline hover:scale-105"
        >
          About
        </a>
      </div>

      {/* Profile or Login */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <RandomAvatar name={user.name || user.regno || "Guest"} size={40} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-2 w-48 p-2 z-50"
            >
              <li>
                <a className="justify-between">
                  Hi, {user.name || "User"}
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => navigate("/register")}
            className="btn btn-primary"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
