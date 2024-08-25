import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedForNotLogin = ({ children, redirectTo }) => {
  // const { isAuthenticated } = useAuth();
  const authtoken = localStorage.getItem("authtoken")
  return authtoken ? children : <Navigate to={redirectTo} />;
};

export default ProtectedForNotLogin;
