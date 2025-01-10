import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken, isAuthenticated } from "../auth";

const PrivateRoute = ({ children, roles }) => {
  console.log("Token:", localStorage.getItem("token")); // Kiểm tra token
  console.log("User Role:", getRoleFromToken());       // Kiểm tra vai trò

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getRoleFromToken();
  if (!roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
