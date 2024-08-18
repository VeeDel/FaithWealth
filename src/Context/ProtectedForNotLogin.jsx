import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedForNotLogin = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedForNotLogin;
