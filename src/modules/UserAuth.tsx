import React, { useContext, useEffect, useState } from "react";
import { auth, provider } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

import { initializeApp } from "@firebase/app"; // Firebase 초기화를 위해 추가

interface AuthContextProps {
  currentUser: any;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  signupWithGoogle: () => void;
  logout: () => Promise<void>;
}

const UserAuth = React.createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(UserAuth);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string) => {
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
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
    <UserAuth.Provider value={value}>{!loading && children}</UserAuth.Provider>
  );
}
