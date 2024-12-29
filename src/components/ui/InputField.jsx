import React from "react"
import { motion } from "framer-motion"

const InputField = ({ name, placeholder, value, onChange, type = "text", variants }) => {
  return (
    <motion.input
      variants={variants}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mb-3 sm:mb-4 p-2 sm:p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
      placeholder={placeholder}
    />
  )
}

export default InputField
