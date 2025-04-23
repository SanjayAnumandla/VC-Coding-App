import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const routerLocation = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: routerLocation }} replace />;
  }

  return children;
}

export default PrivateRoute;