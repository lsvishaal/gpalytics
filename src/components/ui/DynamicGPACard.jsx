"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const DynamicGPACard = () => {
  const [studentName, setStudentName] = useState("N/A");
  const [rollNumber, setRollNumber] = useState("N/A");
  const [semester, setSemester] = useState("");
  const [gpa, setGPA] = useState("N/A");
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.VITE_API_BASE_URL;

  // Debugging API Base URL
  console.log("API_BASE_URL:", API_BASE_URL);

  useEffect(() => {
    const savedSemester = Cookies.get("semester");
    if (savedSemester) {
      console.log(`Saved semester found: ${savedSemester}`);
      fetchDetails(savedSemester);
    } else {
      console.log("No saved semester found in cookies.");
    }
  }, []);

  const fetchDetails = async (semester) => {
    try {
      console.log(`Fetching details for semester: ${semester}`);
      Cookies.set("semester", semester); // Save semester in cookies
      console.log("Semester saved to cookies.");

      // Fetch user details
      console.log("Attempting to fetch user details...");
      const userResponse = await fetch(`${API_BASE_URL}/protected/get-details`, {
        method: "GET",
        credentials: "include", // Send cookies
      });

      // Log response status and headers for debugging
      console.log("User response status:", userResponse.status);
      console.log("User response headers:", [...userResponse.headers.entries()]);

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(`Failed to fetch user details: ${errorText}`);
      }

      const userData = await userResponse.json();
      console.log("User data fetched successfully:", userData);
      setStudentName(userData.name);
      setRollNumber(userData.regno);

      // Fetch semester details
      console.log(`Attempting to fetch semester details for semester: ${semester}`);
      const semResponse = await fetch(
        `${API_BASE_URL}/protected/get-sem-details?sem=${semester}`,
        {
          method: "GET",
          credentials: "include", // Send cookies
        }
      );

      // Log response status and headers for debugging
      console.log("Semester response status:", semResponse.status);
      console.log("Semester response headers:", [...semResponse.headers.entries()]);

      if (!semResponse.ok) {
        const errorText = await semResponse.text();
        throw new Error(`Failed to fetch semester details: ${errorText}`);
      }

      const semData = await semResponse.json();
      console.log("Semester data fetched successfully:", semData);

      const semesterDetails = semData["gpa-details"].find(
        (s) => s.semester == semester
      );

      if (!semesterDetails) {
        alert("No details available for this semester.");
        setSubjects([]);
        setGPA("N/A");
        return;
      }

      console.log("Semester details:", semesterDetails);
      setSubjects(semesterDetails.grades);
      setGPA(semesterDetails.gpa.toFixed(2));
    } catch (err) {
      console.error("Error fetching details:", err.message);
      setError(`NetworkError: ${err.message}`);
    }
  };

  const handleFetch = () => {
    console.log("Fetch button clicked.");
    if (!semester) {
      alert("Please enter a semester number.");
      return;
    }
    fetchDetails(semester);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Input Section */}
      <div className="mb-6">
        <input
          type="number"
          placeholder="Enter Semester Number"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-72 px-4 py-2 rounded-md text-black"
        />
        <button
          onClick={handleFetch}
          className="w-72 mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Fetch Details
        </button>
      </div>

      {/* GPA Card */}
      <div className="w-80 p-6 rounded-lg bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-dancing text-right">{studentName}</h1>
        <p className="text-lg text-right">{rollNumber}</p>
        <div className="mt-4 border-t border-gray-700 pt-4">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="flex justify-between font-bold py-1 text-sm"
            >
              <span>{subject.course_name}</span>
              <span>{subject.grade}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-16 flex items-center justify-center text-3xl font-bold bg-white text-green-600 rounded-lg shadow">
          GPA: {gpa}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-red-500 text-center font-bold">{error}</p>
      )}
    </div>
  );
};

export default DynamicGPACard;
