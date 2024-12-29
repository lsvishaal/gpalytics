import React from "react"
import { motion } from "framer-motion"

const PasswordInput = ({ name, placeholder, value, onChange, showPassword, toggleShowPassword, variants }) => {
  return (
    <div className="relative">
      <motion.input
        variants={variants}
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mb-3 sm:mb-4 p-2 sm:p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-3 top-3 text-[#ffd700]"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  )
}

export default PasswordInput
