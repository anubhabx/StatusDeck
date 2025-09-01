"use client";

import { useAuthStore } from "@/app/store/auth.store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "./Loader";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }

    if (user && (pathname === "/signin" || pathname === "/signup")) {
      console.log("redirecting to /dashboard");
      router.push("/dashboard");
    }
  }, [user, router, pathname]);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedPage;
