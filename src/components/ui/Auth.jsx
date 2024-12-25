import React, { useState } from "react";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Panel */}
        <motion.div
          animate={{
            x: isSignIn ? 0 : "-100%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex flex-col items-center justify-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            {isSignIn ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="text-center mb-6">
            {isSignIn
              ? "Enter your personal details and start your journey with us."
              : "Already have an account? Sign in now and manage your academic progress effortlessly!"}
          </p>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="btn btn-outline text-white border-white hover:bg-white hover:text-purple-600"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          animate={{
            x: isSignIn ? 0 : "100%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex-1 p-8 flex flex-col justify-center"
        >
          {isSignIn ? (
            <form>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Email or Register Number"
                  className="input input-bordered w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <a href="#" className="text-sm text-primary">
                  Forgot Password?
                </a>
              </div>
              <button className="btn btn-primary w-full mt-6">Sign In</button>
            </form>
          ) : (
            <form>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Create Account
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Register Number"
                  className="input input-bordered w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full mt-6">Sign Up</button>
            </form>
          )}
        </motion.div>

        {/* Sliding Overlay */}
        <motion.div
          animate={{
            x: isSignIn ? 0 : "-50%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 ${
            isSignIn ? "right-0" : "left-0"
          }`}
        ></motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
