import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthFunctions } from "../Utils/Firebase/firebase";

const PrivateRoutes = ({ children }) => {
  const { user, checkAdminStatus } = useAuthFunctions();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkUserAdminStatus = async () => {
      if (user) {
        try {
          const isAdminUser = await checkAdminStatus(user.uid);
          
          setIsAdmin(isAdminUser);

          // If the user is not an admin, redirect to /clock-in
          if (!isAdminUser) {
            navigate("/clock-in");
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      } else {
        // If the user is not logged in, redirect to /clock-in
        navigate("/clock-in");
      }
    };

    checkUserAdminStatus();
  }, [user, navigate]);

  return isAdmin !== null ? children : null;
};

export default PrivateRoutes;
