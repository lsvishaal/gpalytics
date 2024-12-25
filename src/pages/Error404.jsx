import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  // Text bounce animation
  const textVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  // Glow effect for the main text
  const glowAnimation = {
    animate: {
      textShadow: [
        "0 0 5px #ffd700",
        "0 0 10px #ffcc00",
        "0 0 20px #ffd700",
        "0 0 10px #ffcc00",
        "0 0 5px #ffd700",
      ],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  // Button hover/pulse animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="text-center space-y-8">
        {/* 404 Text with glow */}
        <motion.h1
          variants={glowAnimation}
          animate="animate"
          className="text-6xl sm:text-8xl font-extrabold text-[#ffd700]"
        >
          404
        </motion.h1>

        {/* Bouncing "Page Not Found" text */}
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl text-gray-300"
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        {/* Pulsating Redirect Button */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate="pulse"
          onClick={() => navigate("/")} // Redirect to home page
          className="bg-gradient-to-r from-[#ffd700] to-[#ffcc00] text-[#1f1b18] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]"
        >
          Go Back Home
        </motion.button>
      </div>
    </div>
  );
};

export default Error404;
