import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const UploadImageComponent = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file (JPEG, PNG, JPG).");
    }
  };

  // Confirm and send image to the backend script
  const handleConfirm = async () => {
    if (!imageFile) {
      toast.error("Please upload an image first!");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://localhost:3001/process-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Image processed successfully!");
        console.log("Processed data:", result);
        // You can now send `result` to your backend (e.g., MongoDB).
      } else {
        toast.error(result.error || "Error processing image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg text-white">
      <h1 className="text-lg font-semibold">Upload Your Image</h1>
      <p className="text-sm text-gray-400">Supported formats: JPEG, PNG, JPG, etc.</p>

      {/* Upload Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center"
      >
        <label className="cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-md shadow hover:shadow-lg">
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </motion.div>

      {/* Preview */}
      {previewURL && (
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-medium mb-2">Image Preview:</h2>
          <img src={previewURL} alt="Preview" className="w-64 h-64 object-cover rounded-md shadow-lg" />
        </div>
      )}

      {/* Confirm Button */}
      {previewURL && (
        <motion.button
          onClick={handleConfirm}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={isProcessing}
          className={`px-6 py-2 rounded-md bg-green-500 text-white font-bold shadow ${
            isProcessing ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
          }`}
        >
          {isProcessing ? "Processing..." : "Confirm & Process"}
        </motion.button>
      )}
    </div>
  );
};

export default UploadImageComponent;
