/**
 * UploadPage - Allows users to upload a result image for GPA analysis.
 * After a successful upload and confirmation toast, the user is redirected to the dashboard.
 * The upload component provides visual feedback and ensures the image is valid before processing.
 */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UploadImageComponent from "../components/ui/UploadImageComponent";

const UploadPage = () => {
  const navigate = useNavigate();

  // Redirects to dashboard after successful upload and toast
  const handleUploadSuccess = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // Wait for toast to show
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 p-8 text-white">
      {/* Page Header */}
      <motion.h1
        className="text-4xl font-title font-bold mb-6 text-center text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Upload Your Result Image
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg font-content text-center text-gray-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Upload a clear, complete result image. After successful processing,
        you'll be redirected to your dashboard for analytics.
      </motion.p>

      {/* Upload Component */}
      <motion.div
        className="w-full max-w-lg bg-gray-800 bg-opacity-50 p-6 rounded-xl shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <UploadImageComponent onSuccess={handleUploadSuccess} />
      </motion.div>
    </div>
  );
};

export default UploadPage;
