import React, { useContext } from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "../Login";
import Mypage from "../Mypage";

interface PrivateRouteProps {
  path?: string;
  element?: React.ReactNode;
}
//{ element, ...rest }
const PrivateRoute = (): React.ReactElement => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="login" />;
  // <Route
  //   // {...rest}
  //   element={currentUser ? <Mypage /> : <Navigate to="login" />}
  // />
};

export default PrivateRoute;
