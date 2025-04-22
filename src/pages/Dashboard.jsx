import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader"; // A simple spinner/loader component
import DynamicGPACard from "@/components/ui/DynamicGPACard";
import {
  FaCalendarAlt,
  FaStar,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa";

// Lazy load the components
const SemesterBarChart = lazy(() => import("@/components/ui/SemesterBarChart"));
const LineChartComponent = lazy(() =>
  import("@/components/ui/LineChartComponent")
);
const PieChartComponent = lazy(() =>
  import("@/components/ui/PieChartComponent")
);

const Dashboard = () => {
  // Performance overview state
  const [overview, setOverview] = useState({
    latestSem: null,
    latestCGPA: null,
    totalCredits: null,
    highestGrade: null,
    cgpa: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "https://gpalytics-backend.onrender.com";
        const response = await fetch(
          `${API_BASE_URL}/protected/get-sem-details`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch analytics");
        const result = await response.json();
        const all = result["all result"] || [];
        let totalCredits = 0,
          highestGrade = null;
        let gradeOrder = ["F", "C", "B", "B+", "A", "A+", "O"];
        let latestSem = null;
        let latestCGPA = null;
        let cgpaSum = 0;
        all.forEach((sem) => {
          cgpaSum += sem.gpa || 0;
          if (Array.isArray(sem.grades)) {
            sem.grades.forEach((g) => {
              totalCredits += g.course_credit || 0;
              if (
                !highestGrade ||
                gradeOrder.indexOf(g.grade) > gradeOrder.indexOf(highestGrade)
              ) {
                highestGrade = g.grade;
              }
            });
          }
          if (latestSem === null || sem.semester > latestSem) {
            latestSem = sem.semester;
            latestCGPA = sem.gpa;
          }
        });
        setOverview({
          latestSem: latestSem || "-",
          latestCGPA: latestCGPA !== null ? latestCGPA.toFixed(2) : "-",
          totalCredits,
          highestGrade: highestGrade || "-",
          cgpa: all.length ? (cgpaSum / all.length).toFixed(2) : "-",
          loading: false,
          error: null,
        });
      } catch (err) {
        setOverview((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };
    fetchOverview();
  }, []);

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
          <span className="absolute inset-0 blur-xl opacity-70 text-cyan-500">
            Dashboard
          </span>
        </motion.h1>
        <p className="text-gray-400 text-center text-md md:text-lg">
          Grade Analytics
        </p>
      </motion.div>

      {/* Performance Overview Section */}
      <motion.div
        className="max-w-4xl mx-auto py-12 px-6 md:px-16 rounded-3xl shadow-2xl backdrop-blur-2xl bg-gradient-to-br from-cyan-900/40 via-slate-900/30 to-cyan-800/30"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-title font-semibold text-center mb-10 text-cyan-300 drop-shadow-lg tracking-tight">
          Performance Overview
        </h2>
        {overview.loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader />
          </div>
        ) : overview.error ? (
          <div className="text-center text-red-400 py-8">{overview.error}</div>
        ) : (
          <div className="flex flex-col gap-8 items-center">
            {/* Main Stat Card */}
            <motion.div
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg px-10 py-8 mb-2 w-full max-w-md hover:scale-[1.03] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-col items-center gap-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-cyan-100 tracking-tight">
                  Semester {overview.latestSem}
                </span>
                <span className="text-lg md:text-2xl font-semibold text-cyan-200">
                  GPA{" "}
                  <span className="font-bold text-cyan-100">
                    {overview.latestCGPA}
                  </span>
                </span>
              </div>
              <span className="text-cyan-200 text-sm mt-2 tracking-wide">
                Latest Semester & GPA
              </span>
            </motion.div>
            {/* Other Stats Row */}
            <div className="flex flex-row flex-wrap gap-6 justify-center w-full">
              <motion.div
                className="flex flex-col items-center bg-white/10 backdrop-blur-xl rounded-2xl shadow px-7 py-6 min-w-[160px] hover:scale-[1.04] transition-transform"
                whileHover={{ scale: 1.06 }}
              >
                <FaChartLine className="text-cyan-300 text-2xl mb-1" />
                <span className="text-2xl font-bold text-cyan-100">
                  {overview.cgpa}
                </span>
                <span className="text-cyan-200 text-xs mt-1">
                  CGPA (Overall)
                </span>
              </motion.div>
              <motion.div
                className="flex flex-col items-center bg-white/10 backdrop-blur-xl rounded-2xl shadow px-7 py-6 min-w-[160px] hover:scale-[1.04] transition-transform"
                whileHover={{ scale: 1.06 }}
              >
                <FaLayerGroup className="text-cyan-300 text-2xl mb-1" />
                <span className="text-2xl font-bold text-cyan-100">
                  {overview.totalCredits}
                </span>
                <span className="text-cyan-200 text-xs mt-1">
                  Total Credits
                </span>
              </motion.div>
              <motion.div
                className="flex flex-col items-center bg-white/10 backdrop-blur-xl rounded-2xl shadow px-7 py-6 min-w-[160px] hover:scale-[1.04] transition-transform"
                whileHover={{ scale: 1.06 }}
              >
                <FaStar className="text-cyan-300 text-2xl mb-1" />
                <span className="text-2xl font-bold text-cyan-100">
                  {overview.highestGrade}
                </span>
                <span className="text-cyan-200 text-xs mt-1">
                  Highest Grade
                </span>
              </motion.div>
            </div>
          </div>
        )}
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
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <PieChartComponent />
            <LineChartComponent />
            {/* <DynamicGPACard /> */}
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
