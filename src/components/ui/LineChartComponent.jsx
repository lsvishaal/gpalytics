"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import ErrorCard from "./ErrorCard";
import { ResponsiveContainer } from "recharts";


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
          throw new Error("Server error. Please upload your data first.");
        }

        const result = await response.json();
        const sortedData = result["all result"].sort((a, b) => a.semester - b.semester);
        setData([{ semester: "0", gpa: 0 }, ...sortedData]);
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

    <div className="relative bg-black p-6 rounded-lg shadow-lg min-h-[400px]">
  <h2 className="text-5xlfont-title mt-11 md:text-4xl font-extrabold text-yellow-400 text-center mb-4">
    CGPA Over Semesters
  </h2>

  {/* Error Overlay */}
  {(loading || error || !chartData.length) && (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
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
          message="No data available. Please upload your results."
          actionText="Upload Data"
          onAction={() => window.location.replace("/upload")}
        />
      )}
    </div>
  )}

  {/* Chart */}
  {!loading && !error && chartData.length > 0 && (
    <div className="lg:mt-20 mt-10 w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="semester" tick={{ fontSize: 12, fill: "#FFD700" }} />
          <YAxis domain={[7, 10]} tick={{ fontSize: 12, fill: "#FFD700" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              color: "#FFD700",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#FFD700" }}
          />
          <Line type="monotone" dataKey="gpa" stroke="#FFD700" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}
</div>


  );
};

export default LineChartComponent;
