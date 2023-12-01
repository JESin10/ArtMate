import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
// import Login from "../Login";
// import Mypage from "../Mypage";

// interface PrivateRouteProps {
//   path?: string;
//   element?: React.ReactNode;
// }
const PrivateRoute = (): React.ReactElement => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
