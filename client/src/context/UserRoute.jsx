import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UserRoute = ({ children }) => {
  const token = Cookies.get("jwt");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.isAdmin) {
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
