import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// import Signup from "./Signup";

export default function ProtectedRoutes({ redirectPath = "/login", children }) {
  const { user } = useAuth();
  if (!user) {
    // TODO:
    // check if usr is admin user by cross checking if user id matches any user id in the admin model
    // if a match exits => redirect to /admin
    // if no match exists => redirect to /
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
