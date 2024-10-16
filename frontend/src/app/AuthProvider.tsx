"use client";
import { AuthContext, logout as logoutUser } from "@/entities";
import getUser from "@/entities/user/api/getUser";
import { User } from "@/entities/user/hooks/useUser";
import React, { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
    logoutUser();
  };
  const initializeUser = async () => {
    const user = await getUser();
    setUser(user);
  };
  useEffect(() => {
    initializeUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
