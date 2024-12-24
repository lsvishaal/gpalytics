import React from "react";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-yellow-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-black text-yellow-400 border border-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-yellow-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-black text-yellow-400 border border-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-yellow-300 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
