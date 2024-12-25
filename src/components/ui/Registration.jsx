import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)

  const toggleForm = () => setIsRegister(!isRegister)

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
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const registerButtonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="relative w-full max-w-lg px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? "register" : "login"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            className="bg-[#1f1b18] text-[#f4ede6] p-8 rounded-3xl shadow-[0_4px_15px_rgba(255,215,0,0.2)] border border-[#ffd700]"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2
                className="text-5xl font-bold text-center mb-7 text-[#ffd700] drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]"
              >
                {isRegister ? "Sign Up" : "Login"}
              </motion.h2>

              {isRegister ? (
                <>
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-4 p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Name"
                  />
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-4 p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Reg No (e.g., RA2211027020140)"
                  />
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-4 p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Password"
                    type="password"
                  />
                  <motion.button
                    variants={buttonVariants}
                    className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] font-semibold py-3 rounded-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-opacity-60"
                    type="submit"
                  >
                    Sign Up
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-4 p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Reg No (e.g., RA2211027020140)"
                  />
                  <motion.input
                    variants={inputVariants}
                    className="w-full mb-4 p-3 bg-[#2a2421] text-[#f4ede6] placeholder-[#d2b49c] border border-[#ffd700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-opacity-60"
                    placeholder="Password"
                    type="password"
                  />
                  <motion.button
                    variants={buttonVariants}
                    className="w-full bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] font-semibold py-3 rounded-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-opacity-60"
                    type="submit"
                  >
                    Login
                  </motion.button>
                </>
              )}
              <motion.button
                variants={registerButtonVariants}
                className="mt-4 text-sm text-[#ffd700] font-semibold hover:underline transition-all"
                onClick={toggleForm}
              >
                {isRegister ? "Back to Login" : "Register Instead"}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AuthPage
