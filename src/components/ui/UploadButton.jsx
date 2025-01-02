import React, { useState } from "react";
import toast from "react-hot-toast";

const UploadButton = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPG, PNG, or JPEG image.");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleConfirm = async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Image successfully processed. Sending to backend...");
        onUpload(data); // Call the parent function to handle the backend logic
      } else {
        throw new Error("Error processing image.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process the image.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-gray-500 text-sm">Supported formats: JPG, PNG, JPEG</p>
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl"
      >
        Upload Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />
      {previewUrl && (
        <div className="mt-6 space-y-4 text-center">
          <img src={previewUrl} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
          <p className="text-sm text-gray-600">Verify if the image includes a complete report from ERP.</p>
          <button
            onClick={handleConfirm}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Confirm and Process
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
