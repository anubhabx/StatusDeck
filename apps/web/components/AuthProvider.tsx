"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { usePathname } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize, initialized } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize auth state, don't handle redirects (middleware handles that)
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  // Don't show loading state - let middleware handle redirects
  return <>{children}</>;
};
