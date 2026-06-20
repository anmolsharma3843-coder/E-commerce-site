import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  try {
    if (user.isAdmin) {
      // If admin tries to access user UI, redirect to admin dashboard
      return <Navigate to="/admin" replace />;
    }
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default UserRoute;
