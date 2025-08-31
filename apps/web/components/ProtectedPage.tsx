"use client";

import { useAuthStore } from "@/app/store/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "./Loader";

const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  });

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedPage;
