"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SemesterBarChart = () => {
  const [data, setData] = useState([]);
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
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

        const response = await fetch(`${API_BASE_URL}/protected/get-sem-details`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          setData(result["all result"]);
          setSelectedSemester(result["all result"][0]?.semester);
          setLoading(false);
        } else {
          throw new Error("Invalid content type. Expected JSON.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
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
        .filter((word) => word.toLowerCase() !== "and") // Exclude "and"
        .map((word) => word[0].toUpperCase())
        .join("."),
      gradeValue: gradeMapping[grade.grade],
    })) || [];

  return (
    <div className="p-12 bg-black min-h-[600px] rounded-lg shadow-lg">
      <h2 className="text-4xl font-title font-extrabold mb-6 text-center text-yellow-400">
        Grade Visualization
      </h2>

      {loading && <p className="text-center font-content text-gray-300">Loading data...</p>}
      {error && <p className="text-red-500 font-content text-center">Error: {error}</p>}

      {!loading && !error && (
        <div className="space-y-8">
          {/* Dropdown */}
          <div className="flex justify-center">
            <select
              className="px-6 py-3 rounded bg-gray-800 text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
            >
              {data.map((item) => (
                <option key={item.semester} value={item.semester}>
                  Semester {item.semester}
                </option>
              ))}
            </select>
          </div>

          {/* Bar Chart */}
          {chartData.length > 0 ? (
            <div className="flex justify-center">
              <RechartsBarChart
                width={1200} // Larger width for better visibility
                height={550}
                data={chartData}
                margin={{ top: 20, right: 60, left: 60, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="course"
                  tick={{ fontSize: 16, fill: "#FFD700" }}
                  interval={0}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => reverseGradeMapping[value] || value}
                  ticks={Object.values(gradeMapping)}
                  tick={{ fontSize: 16, fill: "#FFD700" }}
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
                  cursor={{ fill: "transparent" }} // Transparent hover cursor
                />
                <Bar
                  dataKey="gradeValue"
                  fill="#FFD700" // Yellow bar color
                  radius={[12, 12, 0, 0]} // Rounded corners
                  name="Grade"
                  barSize={70} // Slightly wider bars
                />
              </RechartsBarChart>
            </div>
          ) : (
            <p className="text-center text-gray-300">
              No grades available for this semester.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SemesterBarChart;
