import React from "react"
import { motion } from "framer-motion"
import { BackgroundLines } from "./background-lines"

const LandingPage = () => {
  // Faster and sharper flicker
  const flickerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0],
      textShadow: [
        "0 0 0px rgba(255, 255, 0, 0)",
        "0 0 30px rgba(255, 255, 0, 1)",
        "0 0 0px rgba(255, 255, 0, 0)",
      ],
      transition: {
        duration: 0.3, // Faster flicker
        ease: "easeOut",
        repeat: 1,
        repeatDelay: 0.5,
      },
    },
    exit: { opacity: 1 },
  }

  // Smooth breathing bloom
  const bloomAnimation = {
    animate: {
      textShadow: [
        "0 0 10px rgba(255, 255, 0, 0.5)",
        "0 0 20px rgba(255, 255, 0, 0.8)",
        "0 0 30px rgba(255, 255, 0, 1)",
        "0 0 20px rgba(255, 255, 0, 0.8)",
        "0 0 10px rgba(255, 255, 0, 0.5)",
      ],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  }

  const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  }

  const buttonAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8,
      },
    },
  }

  const cardAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1 + i * 0.1,
      },
    }),
  }

  return (
    <BackgroundLines
      className="relative bg-grainy min-h-screen flex items-center justify-center text-base-content"
      svgOptions={{ duration: 12 }}
    >
      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.h1
          initial="initial"
          animate="animate"
          exit="exit"
          variants={flickerAnimation}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-primary"
        >
          <motion.span
            variants={bloomAnimation}
            animate="animate"
            className="text-primary"
          >
            know what matters
          </motion.span>
        </motion.h1>
        <motion.p
          {...textAnimation}
          className="text-base md:text-lg text-gray-400 mb-6 px-4 md:px-0"
        >
          Simplify your academic analysis. Get insights that matter.
        </motion.p>
        <motion.div
          {...buttonAnimation}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button className="btn btn-primary btn-md px-6 py-2 text-sm">
            Get Started
          </button>
          <button className="btn btn-outline btn-md px-6 py-2 text-sm">
            Learn More
          </button>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          {[
            { value: "567,234", label: "Total GPAs Calculated" },
            { value: "3.4s", label: "Avg Processing Time" },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              className="bg-accent text-base-content p-4 rounded-md shadow-md"
            >
              <h3 className="text-xl font-bold mb-1">{card.value}</h3>
              <p className="text-xs text-gray-400">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </BackgroundLines>
  )
}

export default LandingPage
