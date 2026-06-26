import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../utils/token";

const ProtectedRoute = ({ children }) => {
  const user = decodeToken();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;