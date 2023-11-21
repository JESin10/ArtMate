import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../modules/UserAuth_Google";

interface PrivateRouteProps {
  path?: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  // const [IsUserLogin, setIsUserLogin] = xuseState<boolean>(false);
  const { currentUser } = useAuth();

  // const UserCheckHandler = () => {
  //   if (currentUser || localStorage.getItem("user_name") !== undefined) {
  //     setIsUserLogin(true);
  //   }
  // };

  // useEffect(() => {
  //   UserCheckHandler();
  // }, []);

  // console.log(currentUser);

  // console.log(IsUserLogin);

  return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to={"/login"} />}
    />
  );
};

export default PrivateRoute;
