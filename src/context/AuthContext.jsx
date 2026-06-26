import React, { createContext, useState, useEffect } from "react";
import { setToken, removeToken, decodeToken } from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = decodeToken();
    setAuthUser(user);
  }, []);

  const login = (token) => {
    setToken(token);
    const user = decodeToken();
    setAuthUser(user);
  };

  const logout = () => {
    removeToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
