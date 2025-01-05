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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/protected/upload-image`, {
        method: "POST",
        body: formData,
        credentials: "include",
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
        className="cursor-pointer inline-flex h-12 animate-shimmer items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
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
            className="cursor-pointer inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Confirm and Process
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
