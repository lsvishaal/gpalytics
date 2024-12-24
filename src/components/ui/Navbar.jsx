import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-neutral text-base-content px-6 py-4 shadow-md ">
      {/* Logo */}
      <div className="text-xl font-bold flex items-center">
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
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <a href="#learn" className="hover:text-primary">Learn</a>
        <a href="#build" className="hover:text-primary">Build</a>
        <a href="#community" className="hover:text-primary">Community</a>
        <a href="#about" className="hover:text-primary">About</a>
      </div>

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
    </nav>
  )
}

export default Navbar
