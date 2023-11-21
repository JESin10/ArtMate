import React from "react";

interface AuthContextProps {
  currentUser: any;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  signupWithGoogle: () => void;
  logout: () => Promise<void>;
}

export default function AuthContext() {
  const AuthContext = React.createContext<AuthContextProps | undefined>(
    undefined
  );

  return <div>AuthContext</div>;
}
