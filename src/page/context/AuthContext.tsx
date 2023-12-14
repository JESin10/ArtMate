import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "@firebase/auth";
import { auth, provider } from "../../Firebase";
import { UserInfo } from "../Home";

interface AuthContextProps {
  currentUser: any;
  login: (email: string, password: string) => Promise<any>;
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<any>;
  signupWithGoogle: () => void;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string, displayName: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithGoogle = async () => {
    signInWithRedirect(auth, provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  // const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      // if (currentUser) {
      //   // setUserInfo(currentUser);
      //   localStorage.setItem("user_name", currentUser.displayName);
      //   localStorage.setItem("user_email", currentUser.email);
      //   localStorage.setItem("user_profile", currentUser.photoURL);
      //   localStorage.setItem("user_uid", currentUser.uid);
      //   localStorage.setItem("access_token", currentUser.accessToken);
      // }

      // if (localStorage.getItem("user_email") !== undefined || currentUser) {
      //   setUserInfo({
      //     uid: localStorage.getItem("user_uid") || "",
      //     name: localStorage.getItem("user_name") || "",
      //     profileURL: localStorage.getItem("user_profile") || "",
      //     email: localStorage.getItem("user_email") || "",
      //     access_token: localStorage.getItem("access_token") || "",
      //   });
      // }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextProps = {
    currentUser,
    login,
    signup,
    signupWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
