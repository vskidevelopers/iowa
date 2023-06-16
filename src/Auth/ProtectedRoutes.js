import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// import Signup from "./Signup";

export default function ProtectedRoutes({ redirectPath = "/login", children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
