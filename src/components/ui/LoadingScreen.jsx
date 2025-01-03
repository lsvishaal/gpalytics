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
    }, 1); // Update every 1 ms to reach 100 in 100 ms

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
        {/* Your content goes here */}
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
      {/* Loader Bar */}
      <motion.div
        className="relative mt-4 w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{
          width: "100%",
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-yellow-500"
          animate={{
            scaleX: [0, 1],
            transition: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;