import React from "react";
import { Navigate, Route } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  path,
  element,
}: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
