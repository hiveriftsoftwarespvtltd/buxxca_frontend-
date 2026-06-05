import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("buxaa_user");
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem("buxaa_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("buxaa_user");
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login logic
    const isMockAdmin = email.toLowerCase() === "admin@buxaa.com";
    const name = isMockAdmin ? "Admin User" : email.split("@")[0];
    const newUser = {
      name: name,
      email: email,
      role: isMockAdmin ? "admin" : "customer",
      avatar: isMockAdmin ? "/assets/imgs/people/avatar2.jpg" : "/assets/imgs/template/ava_1.png"
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (data) => {
    // Mock registration logic
    const newUser = {
      name: data.name || data.email.split("@")[0],
      email: data.email,
      role: "customer",
      avatar: "/assets/imgs/template/ava_1.png"
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
