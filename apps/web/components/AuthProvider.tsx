"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import Loader from "./Loader";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getCurrentUser, loading } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // Optionally show a loading state while checking auth
  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};
