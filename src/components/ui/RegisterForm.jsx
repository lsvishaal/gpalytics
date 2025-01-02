import React from "react";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import { motion } from "framer-motion";

const RegisterForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  showPassword,
  toggleShowPassword,
  inputVariants,
  buttonVariants,
}) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Minimum 8 characters, at least one uppercase, one number, one special character

  const isPasswordValid = passwordRegex.test(formData.password);
  const isConfirmPasswordMatch = formData.password === formData.confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <InputField
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        variants={inputVariants}
        className="mt-4"
      />

      {/* Registration Number Input */}
      <InputField
        name="regno"
        placeholder="Reg No (e.g., RA2211027020140)"
        value={formData.regno}
        onChange={handleInputChange}
        variants={inputVariants}
      />

      {/* Batch Number Dropdown */}
      <motion.div
        variants={inputVariants}
        className="mt-4"
      >
        <label htmlFor="batch" className="block text-sm font-medium text-gray-300 mb-2">
          Batch Number
        </label>
        <select
          id="batch"
          name="batch"
          value={formData.batch}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-[#1f1b18] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
        >
          {/* Generate years dynamically */}
          {Array.from({ length: 11 }, (_, i) => 2015 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </motion.div>

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

      {/* Password Requirements Message */}
      {!isPasswordValid && formData.password && (
        <p className="text-xs text-red-500">
          Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
        </p>
      )}

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

      {/* Password Match Message */}
      {!isConfirmPasswordMatch && formData.confirmPassword && (
        <p className="text-xs text-red-500">Passwords do not match.</p>
      )}

      {/* Submit Button */}
      <motion.button
        variants={buttonVariants}
        className={`w-full bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] text-sm sm:text-base font-semibold py-3 rounded-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-opacity-60 mt-4 ${
          !isPasswordValid || !isConfirmPasswordMatch ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={!isPasswordValid || !isConfirmPasswordMatch}
      >
        Sign Up
      </motion.button>
    </form>
  );
};

export default RegisterForm;
