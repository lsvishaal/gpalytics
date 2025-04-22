import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Zoom from "react-medium-image-zoom"; // Import the zoom library
import "react-medium-image-zoom/dist/styles.css"; // Import the default styles

const UploadImageComponent = ({ onSuccess }) => {
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Process and validate image
  const processImage = (file) => {
    if (
      !file ||
      !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ) {
      toast.error("Please upload a valid image file (JPEG, PNG, JPG).");
      return;
    }
    setImageFile(file);
    setPreviewURL(URL.createObjectURL(file));
    toast.success("Image loaded successfully!");
  };

  // Handle image upload (from file input or paste event)
  const handleImage = (e) => {
    if (e.type === "change") {
      const file = e.target.files[0];
      processImage(file);
    } else if (e.type === "paste") {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          processImage(file);
          return;
        }
      }
      toast.error("No image found in clipboard.");
    }
  };

  // Add paste event listener
  useEffect(() => {
    window.addEventListener("paste", handleImage);
    return () => {
      window.removeEventListener("paste", handleImage);
    };
  }, []);

  // Confirm and send image to the backend
  const handleConfirm = async () => {
    if (!imageFile) {
      toast.error("Please upload or paste an image first!");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(
        "https://gpalytics-backend.onrender.com/protected/upload-image",
        {
          method: "POST",
          body: formData,
          credentials: "include", // Ensures cookies are sent with the request
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Image processed successfully!");
        if (onSuccess) onSuccess(); // Call the redirect handler after toast
        // Optionally send `result` to another backend or handle it further
      } else {
        toast.error(result.detail || "Error processing image.");
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
      <h1 className="text-lg font-semibold">Upload or Paste Your Image</h1>
      <p className="text-sm text-gray-400">
        Supported formats: JPEG, PNG, JPG, etc.
      </p>

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
            onChange={handleImage}
            className="hidden"
          />
        </label>
      </motion.div>

      {/* Preview */}
      {previewURL && (
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-medium mb-2">Image Preview:</h2>
          <Zoom>
            <img
              src={previewURL}
              alt="Preview"
              className="w-64 h-64 object-contain rounded-md shadow-lg bg-transparent"
            />
          </Zoom>
          <p className="text-xs text-gray-500 mt-2">
            Click on the image to zoom.
          </p>
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
