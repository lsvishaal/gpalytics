import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Simulate fetching user data from authentication or database
  useEffect(() => {
    const fetchUserData = async () => {
      // Replace this mock data with an actual API/database call
      const mockUser = {
        userId: "user123",
        name: "John Doe",
        profilePicture:
          "https://i.pravatar.cc/150?img=5", // Random profile picture generator (e.g., i.pravatar.cc)
      };
      setUser(mockUser);
    };

    fetchUserData();
  }, []);

  return (
    <nav className="flex justify-between items-center bg-neutral text-base-content px-6 py-4 shadow-md">
      {/* Logo and Title */}
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

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <a href="/" className="hover:text-primary">
          Home
        </a>
        <a href="/register" className="hover:text-primary">
          RegisterAuthPage
        </a>
        <a href="/#community" className="hover:text-primary">
          Community
        </a>
        <a href="/#about" className="hover:text-primary">
          About
        </a>
      </div>

      {/* Right-hand Widgets */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button className="btn btn-ghost btn-sm">
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
              d="M12 3v18m9-9H3"
            />
          </svg>
        </button>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user && (
                <img
                  alt={`${user.name}'s Avatar`}
                  src={user.profilePicture} // Dynamically fetched profile picture
                />
              )}
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
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
