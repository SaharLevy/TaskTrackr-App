import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
