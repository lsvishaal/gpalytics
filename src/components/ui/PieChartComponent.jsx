"use client";

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";
import ErrorCard from "./ErrorCard";

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(null);

  const COLORS = ["#FFD700", "#FFA500", "#FF4500", "#32CD32", "#1E90FF", "#8A2BE2", "#FF69B4"];

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
        setData(result["all result"]);
        setSelectedSemester(result["all result"][0]?.semester);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const gradeOccurrences = data
    .find((item) => item.semester === selectedSemester)
    ?.grades.reduce((acc, grade) => {
      acc[grade.grade] = (acc[grade.grade] || 0) + 1;
      return acc;
    }, {});

  const chartData = gradeOccurrences
    ? Object.keys(gradeOccurrences).map((grade) => ({
        name: grade,
        value: gradeOccurrences[grade],
      }))
    : [];

  return (
    <div className="relative p-6 md:p-12 lg:p-16 bg-black min-h-[600px] rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-title font-extrabold mb-6 text-center text-yellow-400">
  Grade Distribution
</h2>


 {/* Dropdown */}
{data.length > 0 && (
  <div className="flex justify-center mb-4">
    <select
      className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 focus:outline-none"
      value={selectedSemester || ""}
      onChange={(e) => setSelectedSemester(Number(e.target.value))}
    >
      {data.map((item) => (
        <option key={item.semester} value={item.semester}>
          Semester {item.semester}
        </option>
      ))}
    </select>
  </div>
)}

{/* Error overlay */}
{(loading || error || !chartData.length) && (
  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 rounded-lg">
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
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                color: "#FFD700",
                border: "none",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#FFD700" }}
            />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
