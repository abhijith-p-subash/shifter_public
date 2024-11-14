import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is logged in

  if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
    return <Navigate to="/home" replace />; // Redirect logged-in users away from login/signup
  }

  return <>{children}</>;
};

export default PublicRoute;
