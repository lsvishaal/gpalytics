import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
      <div className="text-center px-6 max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-yellow-500">GlossyTech</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-yellow-300">
          The future of technology is bold and bright. Discover innovation with clarity.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-all shadow-md">
            Get Started
          </button>
          <button className="px-6 py-3 text-lg font-semibold rounded-lg border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;