import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  return user ? <Navigate to="/home" replace /> : children;
}