import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../modules/UserAuth_Google";

interface PrivateRouteProps {
  path?: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const [IsUserLogin, setIsUserLogin] = useState<boolean>(false);

  const UserCheckHandler = () => {
    if (localStorage.getItem("user_name")) {
      setIsUserLogin(true);
    }
  };

  useEffect(() => {
    UserCheckHandler();
  }, [IsUserLogin]);

  return (
    <Route
      {...rest}
      element={IsUserLogin ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
