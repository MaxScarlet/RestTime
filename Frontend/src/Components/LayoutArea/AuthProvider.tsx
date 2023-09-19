import React, { createContext, useContext, useState } from "react";
import userService from "../../Services/UserService";
import { useNavigate } from "react-router";
import UserModel from "../../Models/UserModel";
import jwt_decode from "jwt-decode";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  //   user: UserModel | null;
}

// Create an AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const token = await userService.login({ email, password });
    if (!token) {
      throw new Error("Authentication failed");
    }

    //Set user to localStorage
    const decodedToken: any = jwt_decode(token);
    const user = await userService.getItem(decodedToken.id, true);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token: token, login, logout }}>
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
