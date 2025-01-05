"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ErrorCard from "./ErrorCard";

const SemesterBarChart = () => {
  const [data, setData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gradeMapping = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    F: 0,
  };

  const reverseGradeMapping = Object.fromEntries(
    Object.entries(gradeMapping).map(([grade, value]) => [value, grade])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = "https://gpalytics-backend.onrender.com";
        const response = await fetch(`${API_BASE_URL}/protected/get-sem-details`, {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 500) {
            throw new Error("Server error. Please upload your data first.");
          }
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        const allSemesters = result["all result"].map((item) => item.semester);
        setData(result["all result"]);
        setSemesters(allSemesters);
        setSelectedSemester(allSemesters[0] || null); // Default to first semester
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData =
    data.find((item) => item.semester === selectedSemester) || {};

  const chartData =
    filteredData.grades?.map((grade) => ({
      course: grade.course_name
        .split(" ")
        .filter((word) => word.toLowerCase() !== "and")
        .map((word) => word[0].toUpperCase())
        .join("."),
      gradeValue: gradeMapping[grade.grade],
    })) || [];

  return (
    <div className="relative p-4 bg-black rounded-lg shadow-lg min-h-[400px]">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-title font-extrabold mb-4 text-center text-yellow-400">
        Grade Visualization
      </h2>

      {/* Dropdown */}
      {semesters.length > 0 && (
        <div className="flex justify-center mb-4">
          <select
            className="px-3 py-2 rounded bg-black text-yellow-400 border border-yellow-400 focus:outline-none text-sm md:text-base"
            value={selectedSemester || ""}
            onChange={(e) => setSelectedSemester(Number(e.target.value))}
          >
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error Overlay */}
      {(loading || error || !chartData.length) && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 rounded-lg">
          {loading && <ErrorCard message="Loading data..." />}
          {error && (
            <ErrorCard
              message={error}
              actionText="Upload Data"
              onAction={() => window.location.replace("/upload")}
            />
          )}
          {!loading && !error && !chartData.length && (
            <ErrorCard
              message="No data available for this semester."
              actionText="Upload Data"
              onAction={() => window.location.replace("/upload")}
            />
          )}
        </div>
      )}

      {/* Chart */}
      {!loading && !error && chartData.length > 0 && (
        <div className="w-full">
          <ResponsiveContainer
            width="100%"
            aspect={1.2} // Adjusted for responsiveness
          >
            <RechartsBarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 60, // Spacing for X-axis labels
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="course"
                tick={{ fontSize: 10, fill: "#FFD700" }}
                interval={0}
                tickLine={false}
                angle={-45} // Rotate labels for better visibility
                textAnchor="end"
                height={50} // Adjust label spacing
              />
              <YAxis
                tickFormatter={(value) => reverseGradeMapping[value] || value}
                ticks={Object.values(gradeMapping)}
                tick={{ fontSize: 10, fill: "#FFD700" }}
                domain={[0, 10]}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) =>
                  Object.keys(gradeMapping).find(
                    (key) => gradeMapping[key] === value
                  ) || value
                }
                contentStyle={{
                  backgroundColor: "#222",
                  color: "#FFD700",
                  border: "none",
                  borderRadius: "8px",
                }}
                itemStyle={{
                  color: "#FFD700",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="gradeValue"
                fill="#FFD700"
                radius={[12, 12, 0, 0]}
                name="Grade"
                barSize={20} // Adjusted for better visibility on mobile
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SemesterBarChart;
