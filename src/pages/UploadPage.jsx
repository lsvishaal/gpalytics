import React from "react";
import { motion } from "framer-motion";
import UploadImageComponent from "../components/ui/UploadImageComponent";

const UploadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 p-8 text-white">
      {/* Page Header */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Upload Your Image
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-center text-gray-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Ensure the uploaded image contains a complete report for accurate results.
      </motion.p>

      {/* Upload Component */}
      <motion.div
        className="w-full max-w-lg bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <UploadImageComponent />
      </motion.div>
    </div>
  );
};

export default UploadPage;
