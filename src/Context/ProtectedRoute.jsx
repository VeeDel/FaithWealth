import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, redirectTo }) => {
  const authtoken = localStorage.getItem("authtoken")
  return authtoken ? <Navigate to={redirectTo} /> : children;
};

export default ProtectedRoute;
