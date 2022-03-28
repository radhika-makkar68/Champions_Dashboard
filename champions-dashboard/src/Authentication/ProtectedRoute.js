import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const watchlist = useSelector((state) => state.WatchListReducer.watchlist);

  return watchlist ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
