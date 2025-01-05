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
      {/* Dashboard Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="py-12"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 text-center tracking-wide">
          Dashboard
        </h1>
        <p className="text-gray-400 text-center text-md md:text-lg mt-4">
          Dive into the analytics of your grades with dynamic charts and visualizations!
        </p>
      </motion.div>

      {/* Components Section */}
      <div className="flex flex-col items-center space-y-16 px-6 md:px-16 py-16">
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

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-lg animate-pulse"
        animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"
        animate={{ x: [-10, 0, 10, 0], y: [-10, 10, 0, -10] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

export default Dashboard;
