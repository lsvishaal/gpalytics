import React from "react";

export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full h-48">
      {/* DaisyUI Progress Bars */}
      <div className="space-y-2">
        <progress
          className="progress progress-primary w-56"
          value="10"
          max="100"
        ></progress>
        <progress
          className="progress progress-primary w-56"
          value="40"
          max="100"
        ></progress>
        <progress
          className="progress progress-primary w-56"
          value="70"
          max="100"
        ></progress>
        <progress
          className="progress progress-primary w-56"
          value="100"
          max="100"
        ></progress>
      </div>

      {/* Spinning Loader */}
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
