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
    <div className="navbar bg-black/70 backdrop-blur-lg shadow-md sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Hamburger Menu (Visible only on Mobile) */}
        <div className="dropdown md:hidden">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {menuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black/90 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => navigate("/")}>Home</a>
              </li>
              <li>
                <a onClick={() => navigate("/upload")}>Upload</a>
              </li>
              <li>
                <a onClick={() => navigate("/dashboard")}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => navigate("/collaborators")}>Collaborators</a>
              </li>
              <li>
                <a onClick={() => navigate("/about")}>About</a>
              </li>
            </ul>
          )}
        </div>

        {/* Logo (Leftmost on Desktop, Centered on Mobile) */}
        <a
          href="/"
          className="btn btn-ghost text-xl flex items-center space-x-2 md:justify-start justify-center w-full md:w-auto"
        >
          {/* Logo SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c2.5 0 4 1.5 4 4s-1.5 4-4 4-4-1.5-4-4 1.5-4 4-4zm0 0C8.5 8 6 6.5 6 4.5S8.5 1 12 1s6 2 6 3.5S15.5 8 12 8z"
            />
          </svg>
          <span>
            <span className="text-yellow-400">GPA</span>lytics
          </span>
        </a>
      </div>

      {/* Navbar Center (Routes - Desktop Only) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => navigate("/")}>Home</a>
          </li>
          <li>
            <a onClick={() => navigate("/upload")}>Upload</a>
          </li>
          <li>
            <a onClick={() => navigate("/dashboard")}>Dashboard</a>
          </li>
          <li>
            <a onClick={() => navigate("/collaborators")}>Collaborators</a>
          </li>
          <li>
            <a onClick={() => navigate("/about")}>About</a>
          </li>
        </ul>
      </div>

      {/* Navbar End (Profile Picture or Login) */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <RandomAvatar
                  name={user.name || user.regno || "Guest"}
                  size={40}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black/90 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="block px-4 py-2 text-gray-300">
                  Hi, {user.name || "User"}
                </span>
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
    </div>
  );
};

export default Navbar;
