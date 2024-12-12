'use client'

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/constants";
import api from "@/app/api";

interface AuthContextType {
  isAuthorized: boolean | null;
  login: (accessToken: string) => void;
  logout: () => void;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    checkTokenValidity();
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (accessToken: string, ) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    setIsAuthorized(true);
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsAuthorized(false);
    router.push("/login");
  };

  const checkTokenValidity = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // If there's no token, no need to check with the server
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const response = await api.get("/react/accounts/secure_endpoint");
      if (response.status === 200) {
        setIsAuthorized(true);
        console.log("Auth successful");
        // router.push("/")
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setIsAuthorized(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
