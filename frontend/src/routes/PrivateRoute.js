// frontend/src/routes/PrivateRoute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If user is logged in, render the child component (Outlet)
  // Otherwise, redirect to the login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;