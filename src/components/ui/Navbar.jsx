import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/protected/get-details`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
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
        <a href="/" className="hover:text-primary">Home</a>
        <a href="/register" className="hover:text-primary">Register</a>
        <a href="/#community" className="hover:text-primary">Community</a>
        <a href="/#about" className="hover:text-primary">About</a>
      </div>

      {/* Profile and Logout */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.profilePicture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button onClick={() => navigate("/register")} className="btn btn-primary">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
