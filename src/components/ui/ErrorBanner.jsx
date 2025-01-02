import React from "react";
import { motion } from "framer-motion";

const ErrorBanner = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <motion.div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm sm:text-base px-6 py-3 rounded-md shadow-lg flex items-center space-x-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <span>{error}</span>
      <button
        onClick={onClose}
        className="text-white font-bold hover:text-gray-300 transition"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default ErrorBanner;
