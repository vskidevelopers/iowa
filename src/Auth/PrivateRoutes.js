import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthFunctions } from "../Utils/Firebase/firebase";

export default function PrivateRoutes() {
  const { user } = useAuthFunctions;
  const navigate = useNavigate();
  const location = useLocation();

  if (user) {
    // If there's a logged-in user, navigate to /clock-in
    navigate("/clock-in");
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
