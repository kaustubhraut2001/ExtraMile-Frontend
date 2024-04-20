import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom"; // Import Navigate component

const ProtectedRoute = (props) => {
  const { Component } = props;
  const isAuthenticated = localStorage.getItem("token");
  console.log("Protected route --------- ", isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    // Return a Navigate component instead of calling navigate directly
    return <Navigate to="/login" />;
  }

  console.log("Protected route &&&&&");

  return <Component />;
};

export default ProtectedRoute;
