"use client"; // Ensure this component is for client-side rendering

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Use the correct `useNavigate` hook
import { BackgroundLines } from "../components/ui/background-lines";

const LandingPage = () => {
  const navigate = useNavigate(); // Correctly initialize navigation using `useNavigate`

  // Animation configurations remain unchanged
  const flickerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0.3, 1],
      textShadow: [
        "0 0 0px rgba(255, 255, 0, 0)",
        "0 0 20px rgba(255, 255, 0, 1)",
        "0 0 5px rgba(255, 255, 0, 0.5)",
      ],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: 0,
      },
    },
  };

  const breathingAnimation = {
    animate: {
      textShadow: [
        "0 0 10px rgba(255, 255, 0, 0.5)",
        "0 0 20px rgba(255, 255, 0, 0.8)",
      ],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const textAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 1.5 },
    },
  };

  const buttonAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 2 },
    },
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 2.2 + i * 0.1 },
    }),
  };

  return (
    <BackgroundLines
      className="relative bg-grainy min-h-screen flex items-center justify-center text-base-content"
      svgOptions={{ duration: 12 }}
    >
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
        <motion.h1
          initial="initial"
          animate="animate"
          variants={flickerAnimation}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          <motion.span
            variants={breathingAnimation}
            animate="animate"
            className="text-primary"
          >
            Know what matters
          </motion.span>
        </motion.h1>
        <motion.p
          {...textAnimation}
          className="text-base md:text-lg text-gray-400 mb-6 px-4 md:px-0"
        >
          Process result images to calculate GPAs, track academic performance,
          and compare insights with peers. Simplify your academic analysis and
          make informed decisions with GPAlytics.
        </motion.p>
        <motion.div
          {...buttonAnimation}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button
            className="btn btn-primary px-5 py-2 text-sm"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </motion.div>
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
  );
};

export default LandingPage;
