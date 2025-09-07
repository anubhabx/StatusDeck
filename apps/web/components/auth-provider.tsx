"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize, initialized, loading } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  if (
    loading &&
    !pathname?.includes("/signin") &&
    !pathname?.includes("/signup")
  ) {
    return <Loader />;
  }

  return <>{children}</>;
};
