import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RandomAvatar } from "react-random-avatars";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Fetch user data on load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/protected/get-details`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null); // Clear user if not authenticated
      }
    };

    fetchUserData();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-neutral text-base-content px-6 py-4 shadow-md">
      {/* Logo */}
      <a href="/" className="text-xl font-bold flex items-center">
        <span className="mr-2">
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
        <span className="text-primary">GPA</span>lytics
      </a>

      {/* Links */}
      <div className="hidden md:flex space-x-8">
        <a href="/" className="hover:text-primary">
          Home
        </a>
        <a href="/register" className="hover:text-primary">
          Register
        </a>
        <a href="/#community" className="hover:text-primary">
          Community
        </a>
        <a href="/#about" className="hover:text-primary">
          About
        </a>
      </div>

      {/* Profile or Login */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <RandomAvatar name={user.name || user.regno || "Guest"} size={40} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {user.name || "Profile"}
                  <span className="badge">{user.regno}</span>
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
