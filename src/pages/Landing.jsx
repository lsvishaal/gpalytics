"use client"; // Ensure this component is for client-side rendering

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "../components/ui/background-lines";
import axios from "axios";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/protected/get-details`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

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
        "0 0 10px rgba(255, 255, 0, 0.5)", // Glow state 1
        "0 0 20px rgba(255, 255, 0, 0.8)", // Glow state 2 (peak)
        "0 0 10px rgba(255, 255, 0, 0.5)", // Glow state 1 (back to initial)
      ],
      transition: {
        duration: 5.5, // 2.75 seconds for "in" and 2.75 seconds for "out"
        ease: "easeInOut", // Smooth transition
        repeat: Infinity, // Loop infinitely
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
          {isLoggedIn ? (
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={() => navigate("/upload")}
            >
              <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Upload
              </span>
            </button>
          ) : (
            <button
              className="btn btn-primary px-5 py-2 text-sm"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          )}
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
