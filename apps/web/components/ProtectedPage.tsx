"use client";

import { useAuthStore } from "@/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "./Loader";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuthStore();

  const isPublicPage =
    pathname === "/signin" || pathname === "/signup" || pathname === "/";
  const isProtectedPage = !isPublicPage;

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    if (!user && isProtectedPage) {
      router.push("/signin");
    }

    if (user && isPublicPage) {
      router.push("/dashboard");
    }
  }, [user, loading, router, pathname, isPublicPage, isProtectedPage]);

  if (loading) {
    return <Loader />;
  }

  // Allow auth pages when not authenticated
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Protect other pages
  if (!user && isProtectedPage) {
    return <Loader />; // Show loader while redirecting
  }

  return <>{children}</>;
};

export default ProtectedPage;
