import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useAuth from "../components/hooks/useAuth"
import LoginForm from "../components/ui/LoginForm"
import RegisterForm from "../components/ui/RegisterForm"

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({ name: "", regno: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const { error, handleAuth } = useAuth()

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsRegister(!isRegister)
    setFormData({ name: "", regno: "", password: "", confirmPassword: "" })
    setShowPassword(false)
  }

  // Handle input changes
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = isRegister
      ? { name: formData.name, regno: formData.regno, password: formData.password }
      : { regno: formData.regno, password: formData.password }

    const result = await handleAuth(isRegister, payload)
    if (result.success) {
      alert(result.message)
      if (isRegister) toggleForm()
      else window.location.href = "/"
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isRegister ? "register" : "login"}
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -50 }}
          className="w-full max-w-md p-6 bg-[#1f1b18] text-[#f4ede6] rounded-2xl shadow-[0_4px_15px_rgba(255,215,0,0.2)] border border-[#ffd700]"
        >
          {/* Heading */}
          <motion.h2
            className="text-4xl font-bold text-center mb-6 text-[#ffd700] drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isRegister ? "Sign Up" : "Login"}
          </motion.h2>

          {/* Form */}
          {isRegister ? (
            <RegisterForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              inputVariants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
              buttonVariants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
            />
          ) : (
            <LoginForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              inputVariants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
              buttonVariants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
            />
          )}

          {/* Toggle Form Button */}
          <motion.button
            onClick={toggleForm}
            className="mt-6 text-sm text-center text-[#ffd700] font-medium hover:underline transition-all"
          >
            {isRegister ? "Back to Login" : "Register Instead"}
          </motion.button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default AuthPage
