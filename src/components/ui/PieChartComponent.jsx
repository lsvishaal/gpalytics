"use client";

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";

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
    <div className="p-12 bg-black min-h-[600px] rounded-lg shadow-lg">
      <h2 className="text-5xl font-title font-extrabold mb-6 text-center text-yellow-400">Grade Distribution</h2>

      {loading && <p className="text-center text-gray-300">Loading data...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="space-y-8">
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
              <Tooltip />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
