import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const GradeDistribution = ({ grades }) => {
  // Group grades and calculate the count for each grade
  const gradeCounts = grades.reduce((acc, curr) => {
    acc[curr.grade] = (acc[curr.grade] || 0) + 1;
    return acc;
  }, {});

  // Convert the object to an array for Recharts
  const chartData = Object.keys(gradeCounts).map((grade) => ({
    grade,
    count: gradeCounts[grade],
  }));

  return (
    <div className="grade-distribution-chart">
      <h2 className="text-lg font-bold mb-4">Grade Distribution</h2>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="grade" label={{ value: "Grades", position: "insideBottom", dy: 10 }} />
        <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="hsl(220, 80%, 60%)" radius={[4, 4, 0, 0]} name="Count" />
      </BarChart>
    </div>
  );
};

export default GradeDistribution;
