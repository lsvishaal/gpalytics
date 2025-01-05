import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader"; // A simple spinner/loader component

// Lazy load the components
const SemesterBarChart = lazy(() => import("@/components/ui/SemesterBarChart"));
const LineChartComponent = lazy(() => import("@/components/ui/LineChartComponent"));
const PieChartComponent = lazy(() => import("@/components/ui/PieChartComponent"));

const Dashboard = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Dashboard Title with Bloom Effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="py-12 space-y-8"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-title font-extrabold text-center relative tracking-wide text-cyan-400"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Dashboard
          <span
            className="absolute inset-0 blur-xl opacity-70 text-cyan-500"
          >
            Dashboard
          </span>
        </motion.h1>
        <p className="text-gray-400 text-center text-md md:text-lg">
          Dive into the analytics of your grades with dynamic charts and visualizations!
        </p>
      </motion.div>

      {/* New Section: Performance Overview */}
      <motion.div
        className="max-w-4xl mx-auto py-12 px-6 md:px-16 rounded-lg shadow-xl backdrop-blur-lg bg-white/10 border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-2xl md:text-3xl font-title font-semibold text-center mb-6 text-cyan-400"
        >
          Performance Overview
        </h2>
        <div className="flex flex-wrap justify-around mt-6 space-y-4 md:space-y-0">
          <div className="text-center">
            <h3
              className="text-4xl md:text-5xl font-title font-bold text-cyan-400"
            >
              3.8
            </h3>
            <p className="text-gray-300">Average GPA</p>
          </div>
          <div className="text-center">
            <h3
              className="text-4xl md:text-5xl font-title font-bold text-cyan-400"
            >
              30
            </h3>
            <p className="text-gray-300">Total Credits</p>
          </div>
          <div className="text-center">
            <h3
              className="text-4xl md:text-5xl font-title font-bold text-cyan-400"
            >
              O
            </h3>
            <p className="text-gray-300">Highest Grade</p>
          </div>
        </div>
      </motion.div>

      {/* Components Section */}
      <div className="flex flex-col items-center space-y-32 px-6 md:px-16 py-24">
        {/* Bar Chart Section */}
        <Suspense fallback={<Loader />}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <SemesterBarChart />
          </motion.div>
        </Suspense>

        {/* Other Charts Section */}
        <Suspense fallback={<Loader />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-16"
          >
            <PieChartComponent />
            <LineChartComponent />
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
