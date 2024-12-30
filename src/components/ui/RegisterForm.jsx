import React from "react"
import InputField from "./InputField"
import PasswordInput from "./PasswordInput"
import { motion } from "framer-motion"

const RegisterForm = ({ formData, handleInputChange, handleSubmit, showPassword, toggleShowPassword, inputVariants, buttonVariants }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <InputField
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        variants={inputVariants}
      />
      {/* Registration Number Input */}
      <InputField
        name="regno"
        placeholder="Register No (e.g., RA2211027020140)"
        value={formData.regno}
        onChange={handleInputChange}
        variants={inputVariants}
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
      {/* Confirm Password Input */}
      <PasswordInput
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        variants={inputVariants}
      />
      {/* Submit Button */}
      <motion.button
        variants={buttonVariants}
        className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] text-sm sm:text-base font-semibold py-3 rounded-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-opacity-60"
        type="submit"
      >
        Sign Up
      </motion.button>
    </form>
  )
}

export default RegisterForm
