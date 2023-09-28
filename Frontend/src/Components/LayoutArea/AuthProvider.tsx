import jwt_decode from "jwt-decode";
import React, { createContext, useContext, useState } from "react";
import userService from "../../Services/UserService";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Create an AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lclToken = checkToken(localStorage.getItem("token"));
  const [token, setToken] = useState<string | null>(lclToken);
  const login = async (email: string, password: string) => {
    const token = await userService.login({ email, password });
    if (!token) {
      throw new Error("Authentication failed");
    }

    const decodedToken: any = jwt_decode(token);
    const user = await userService.getItem(decodedToken.id, true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setToken(token);
  };

  function checkToken(token: string) {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentTimestamp = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
        return null;
      }
      return token;
    }
    return null;
  }
  function isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token: token, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
