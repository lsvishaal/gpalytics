import React from "react"
import InputField from "./InputField"
import PasswordInput from "./PasswordInput"
import { motion } from "framer-motion"

const LoginForm = ({ formData, handleInputChange, handleSubmit, showPassword, toggleShowPassword, inputVariants, buttonVariants }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Registration Number Input */}
      <InputField
        name="regno"
        placeholder="Reg No (e.g., RA2211027020140)"
        value={formData.regno}
        onChange={handleInputChange}
        variants={inputVariants}
        className="mt-4"
      />
      {/* Password Input */}
      <PasswordInput
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        variants={inputVariants}
      />
      {/* Submit Button */}
      <motion.button
        variants={buttonVariants}
        className="w-full py-3 text-sm font-semibold bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] rounded-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-opacity-50 mt-4"
        type="submit"
      >
        Login
      </motion.button>
    </form>
  )
}

export default LoginForm
