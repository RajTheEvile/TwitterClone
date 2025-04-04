import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = () => {
  const jwt = Cookie.get("token");

  return jwt ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
