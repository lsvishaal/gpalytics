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
import ErrorCard from "./ErrorCard";

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
        .filter((word) => word.toLowerCase() !== "and")
        .map((word) => word[0].toUpperCase())
        .join("."),
      gradeValue: gradeMapping[grade.grade],
    })) || [];

  if (loading) {
    return <ErrorCard message="Loading data..." />;
  }

  if (error) {
    return (
      <ErrorCard
        message={error}
        actionText="Upload Data"
        onAction={() => window.location.replace("/upload")}
      />
    );
  }

  if (chartData.length === 0) {
    return (
      <ErrorCard
        message="No data available. Please upload your results to visualize them."
        actionText="Upload Data"
        onAction={() => window.location.replace("/upload")}
      />
    );
  }

  return (
    <div className="p-6 md:p-12 lg:p-16 bg-black min-h-[600px] rounded-lg shadow-lg">
      <h2 className="text-4xl font-title font-extrabold mb-6 text-center text-yellow-400">
        Grade Visualization
      </h2>
      <div className="flex justify-center">
        <RechartsBarChart
          width={800}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 60, left: 60, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="course"
            tick={{ fontSize: 14, fill: "#FFD700" }}
            interval={0}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => reverseGradeMapping[value] || value}
            ticks={Object.values(gradeMapping)}
            tick={{ fontSize: 14, fill: "#FFD700" }}
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
            barSize={40}
          />
        </RechartsBarChart>
      </div>
    </div>
  );
};

export default SemesterBarChart;
