import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // Environment-based API URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      name: "",
      regno: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setError(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = isRegister
        ? `${API_BASE_URL}/register/user`
        : `${API_BASE_URL}/login`;
      const payload = isRegister
        ? { name: formData.name, regno: formData.regno, password: formData.password }
        : { regno: formData.regno, password: formData.password };

      const response = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert(response.data.message || (isRegister ? "Registered successfully!" : "Login successful!"));

      if (!isRegister) {
        // Redirect or perform actions after successful login
        window.location.href = "/";
      } else {
        toggleForm();
      }
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.detail || "An error occurred");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -50,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="relative w-full max-w-md px-4 sm:max-w-lg sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? "register" : "login"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            className="bg-[#1f1b18] text-[#f4ede6] p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-[0_4px_15px_rgba(255,215,0,0.2)] border border-[#ffd700]"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4 sm:space-y-6"
            >
              <motion.h2 className="text-3xl sm:text-5xl font-bold text-center mb-5 sm:mb-7 text-[#ffd700] drop-shadow-[0_0_4px_rgba(255,215,0,0.4)]">
                {isRegister ? "Sign Up" : "Login"}
              </motion.h2>

              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-3 sm:mb-4 p-2 sm:p-3 bg-[#2a2421] text-[#f4ede6] placeholder:text-xs sm:placeholder:text-sm placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                )}
                <motion.input
                  variants={inputVariants}
                  className="w-full mb-3 sm:mb-4 p-2 sm:p-3 bg-[#2a2421] text-[#f4ede6] placeholder:text-xs sm:placeholder:text-sm placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                  placeholder="Reg No (e.g., RA2211027020140)"
                  name="regno"
                  value={formData.regno}
                  onChange={handleInputChange}
                />
                <div className="relative">
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-3 sm:mb-4 p-2 sm:p-3 bg-[#2a2421] text-[#f4ede6] placeholder:text-xs sm:placeholder:text-sm placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#ffd700]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {isRegister && (
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-3 sm:mb-4 p-2 sm:p-3 bg-[#2a2421] text-[#f4ede6] placeholder:text-xs sm:placeholder:text-sm placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                )}
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <motion.button
                  variants={buttonVariants}
                  className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] text-sm sm:text-base font-semibold py-2 sm:py-3 rounded-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-opacity-60"
                  type="submit"
                >
                  {isRegister ? "Sign Up" : "Login"}
                </motion.button>
              </form>

              <motion.button
                variants={buttonVariants}
                className="mt-4 text-xs sm:text-sm text-[#ffd700] font-semibold hover:underline transition-all"
                onClick={toggleForm}
              >
                {isRegister ? "Back to Login" : "Register Instead"}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
