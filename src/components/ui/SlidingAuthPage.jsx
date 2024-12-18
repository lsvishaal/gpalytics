import React, { useState } from "react";

const SlidingAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            isLogin ? "transform translate-x-0" : "transform -translate-x-full"
          }`}
        >
          {/* Login Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 font-bold focus:outline-none"
              >
                Register
              </button>
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            isLogin ? "transform translate-x-full" : "transform translate-x-0"
          }`}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 font-bold focus:outline-none"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingAuthPage;
