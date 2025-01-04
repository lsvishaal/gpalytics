"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const LineChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = data.map((item) => ({
    semester: `Sem ${item.semester}`,
    gpa: item.gpa,
  }));

  return (
    <div className="p-16 bg-black min-h-[800px] rounded-lg shadow-lg">
      <h2 className="text-5xl font-extrabold mb-10 text-center text-yellow-400">
        CGPA Over Semesters
      </h2>

      {loading && <p className="text-center text-gray-300">Loading data...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="flex justify-center">
          <LineChart
            width={1000} // Increased width
            height={600} // Increased height
            data={chartData}
            margin={{ top: 40, right: 50, left: 50, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="semester"
              tick={{ fontSize: 14, fill: "#FFD700" }}
              tickMargin={10}
            />
            <YAxis
              domain={[7.5, 10]} // Adjusted domain
              tick={{ fontSize: 14, fill: "#FFD700" }}
              tickCount={6} // Adds more intermediate ticks
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                color: "#FFD700",
                border: "none",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#FFD700" }}
            />
            <Line
              type="monotone"
              dataKey="gpa"
              stroke="#FFD700"
              strokeWidth={3} // Slightly thicker line
              activeDot={{ r: 10 }} // Larger active dot
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default LineChartComponent;
