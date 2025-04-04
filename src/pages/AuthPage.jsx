import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../components/hooks/useAuth";
import LoginForm from "../components/ui/LoginForm";
import RegisterForm from "../components/ui/RegisterForm";
import toast from "react-hot-toast"; // Import toast

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    password: "",
    confirmPassword: "",
    batch: "2022", // Default batch value
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleAuth } = useAuth();

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", regno: "", password: "", confirmPassword: "", batch: "2022" });
    setShowPassword(false);
  };

  // Handle input changes
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isRegister
      ? { name: formData.name, regno: formData.regno, password: formData.password, batch: formData.batch }
      : { regno: formData.regno, password: formData.password };
  
    try {
      const result = await handleAuth(isRegister, payload);
      if (result.success) {
        if (isRegister) {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => {
            toggleForm(); // Switch to login after a delay
          }, 3000); // 3 seconds delay
        } else {
          toast.success("Login successful! Redirecting to home...");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000); // 3 seconds delay
        }
      } else {
        // Handle backend error response
        const errorMessage =
          result.message ||
          "An error occurred. Please check your input and try again.";
        toast.error(errorMessage, { duration: 6000 });
      }
    } catch (error) {
      // Display generic error message
      toast.error(
        "An unexpected error occurred. Please try again later.",
        { duration: 6000 }
      );
      console.error("Error during submission:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isRegister ? "register" : "login"}
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -50 }}
          className="w-full max-w-md p-6 bg-[#1f1b18] text-[#f4ede6] rounded-2xl shadow-[0_4px_15px_rgba(255,215,0,0.2)] border border-[#ffd700]"
        >
          {/* Heading */}
          <motion.h2
            className="text-4xl font-title font-bold text-center mb-6 text-[#ffd700] drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isRegister ? "Sign Up" : "Login"}
          </motion.h2>

          {/* Form */}
          {isRegister ? (
            <RegisterForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              inputVariants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              buttonVariants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            />
          ) : (
            <LoginForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              inputVariants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              buttonVariants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            />
          )}

          {/* Toggle Form Button */}
          <motion.button
            onClick={toggleForm}
            className="mt-6 text-sm text-center font-content text-[#ffd700] font-medium hover:underline transition-all"
          >
            {isRegister ? "Back to Login" : "Register Instead"}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
