import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader"; // A simple spinner/loader component
import DynamicGPACard from "@/components/ui/DynamicGPACard";

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
        className="max-w-4xl mx-auto py-12 px-6 md:px-16 rounded-lg shadow-xl backdrop-blur-2xl bg-gradient-to-br from-cyan-900/70 via-black/60 to-cyan-800/60 border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl font-title font-semibold text-center mb-6 text-cyan-300 drop-shadow-lg">
          Performance Overview
        </h2>
        {overview.loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader />
          </div>
        ) : overview.error ? (
          <div className="text-center text-red-400 py-8">{overview.error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="col-span-1 text-center">
              <h3 className="text-2xl md:text-3xl font-title font-bold text-cyan-200 bg-cyan-900/60 rounded-xl py-2 px-1 shadow-lg">
                {overview.latestCGPA}
              </h3>
              <p className="text-cyan-100/80">Latest Semester's GPA</p>
            </div>
            <div className="col-span-1 text-center">
              <h3 className="text-2xl md:text-3xl font-title font-bold text-cyan-200 bg-cyan-900/60 rounded-xl py-2 px-1 shadow-lg">
                {overview.cgpa}
              </h3>
              <p className="text-cyan-100/80">CGPA (Overall)</p>
            </div>
            <div className="col-span-1 text-center">
              <h3 className="text-2xl md:text-3xl font-title font-bold text-cyan-200 bg-cyan-900/60 rounded-xl py-2 px-1 shadow-lg">
                {overview.totalCredits}
              </h3>
              <p className="text-cyan-100/80">Total Credits</p>
            </div>
            <div className="col-span-1 text-center">
              <h3 className="text-2xl md:text-3xl font-title font-bold text-cyan-200 bg-cyan-900/60 rounded-xl py-2 px-1 shadow-lg">
                {overview.highestGrade}
              </h3>
              <p className="text-cyan-100/80">Highest Grade</p>
            </div>
          </div>
        )}
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
            {/* <DynamicGPACard /> */}
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
