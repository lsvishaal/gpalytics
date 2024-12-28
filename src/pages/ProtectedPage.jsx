import React, { useEffect, useState } from "react";

const ProtectedPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/protected/get-details`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          throw new Error("Failed to fetch user details");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-500">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <p className="mb-2">
          <strong>User ID:</strong> {userDetails.username}
        </p>
        <p className="mb-2">
          <strong>Registration Number:</strong> {userDetails.regno}
        </p>
        <p>
          <strong>Name:</strong> {userDetails.name}
        </p>
      </div>
    </div>
  );
};

export default ProtectedPage;
