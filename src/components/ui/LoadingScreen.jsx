import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [percentage, setPercentage] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setLoadingComplete(true);
          return 100;
        }
      });
    }, 20); // Update every 20 ms to reach 100 in 2 seconds

    return () => clearInterval(interval);
  }, []);

  const variants = {
    animate: {
      scale: [1, 1.2, 1], // Pulsing effect
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  if (loadingComplete) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
        <h1>Content Loaded</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      {/* Percentage */}
      <motion.div
        className="text-6xl font-bold"
        variants={variants}
        animate="animate"
      >
        {percentage}%
      </motion.div>

      {/* DaisyUI Progress Bar */}
      <div className="space-y-2 mt-8 w-64">
        <progress
          className="progress progress-primary"
          value={percentage}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default LoadingScreen;
