import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = Cookies.get("jwt");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded.isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
};

export default AdminRoute;