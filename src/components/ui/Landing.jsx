import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
      <div className="text-center px-6 max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Welcome to GlossyTech
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          The future of technology is here. Discover innovative solutions and
          products designed to enhance your digital experience.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-6 py-3 text-lg font-medium rounded-lg bg-black/30 backdrop-blur-md border border-gray-600 hover:bg-black/50 transition-all">
            Get Started
          </button>
          <button className="px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
