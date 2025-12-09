import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/model" replace /> : children;
};

export default PublicRoute;
