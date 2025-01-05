import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RandomAvatar } from "react-random-avatars";

const Navbar = () => {
  const [user, setUser] = useState(null); // State for logged-in user
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
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
    <nav className="sticky top-0 z-50 bg-black shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Section (Hamburger Menu + Logo) */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
          <button
            className="block md:hidden text-gray-300 hover:text-yellow-400 focus:outline-none transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Logo */}
          <a href="/" className="text-xl font-bold flex items-center space-x-2 text-gray-200 hover:text-yellow-400 transition">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
              <span className="text-yellow-400">GPA</span>lytics
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:static top-full left-0 w-full ${
            menuOpen ? "bg-gradient-to-b from-black/90 to-black/70 shadow-lg" : ""
          } md:bg-transparent md:w-auto md:p-0 p-4 md:shadow-none transition-all`}
        >
          <a
            onClick={() => navigate("/")}
            className="relative block md:inline-block text-gray-300 px-3 py-2 group cursor-pointer hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
          >
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
          </a>
          <a
            onClick={() => navigate("/upload")}
            className="relative block md:inline-block text-gray-300 px-3 py-2 group cursor-pointer hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
          >
            Upload
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
          </a>
          <a
            onClick={() => navigate("/dashboard")}
            className="relative block md:inline-block text-gray-300 px-3 py-2 group cursor-pointer hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
          >
            Dashboard
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
          </a>
          <a
            onClick={() => navigate("/collaborators")}
            className="relative block md:inline-block text-gray-300 px-3 py-2 group cursor-pointer hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
          >
            Collaborators
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
          </a>
          <a
            onClick={() => navigate("/about")}
            className="relative block md:inline-block text-gray-300 px-3 py-2 group cursor-pointer hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
          >
            About
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
          </a>
        </div>

        {/* Right Section (Profile or Login) */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-yellow-400 focus:outline-none hover:scale-105 transform transition-all duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <RandomAvatar name={user.name || user.regno || "Guest"} size={48} />
              </button>
              {menuOpen && (
                <ul className="absolute right-0 mt-2 w-60 bg-black shadow-lg rounded-lg p-2">
                  <li>
                    <span className="block px-4 py-2 text-gray-300">Hi, {user.name || "User"}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg hover:scale-105 transform transition-all duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/register")}
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 hover:scale-105 transform transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
