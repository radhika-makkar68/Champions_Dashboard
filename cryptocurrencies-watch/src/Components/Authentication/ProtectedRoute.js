import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";

const ProtectedRoute = () => {
  const { user } = CryptoState();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
