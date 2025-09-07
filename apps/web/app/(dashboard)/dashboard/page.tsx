"use client";

import { account } from "@/lib/appwrite";
import axiosClient from "@/lib/axios";
import { Button } from "@workspace/ui/components/button";
import React from "react";
import { toast } from "sonner";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      Dashboard
      <Button
        onClick={() => {
          axiosClient.get("/health").then((res) => {
            toast.success(res.data.message);
          });

          toast.promise(account.get(), {
            loading: "Loading account...",
            success: (account) => `Hello, ${account.name}`,
            error: (err) => `Error: ${err.message}`
          });
        }}
      >
        Primary Button
      </Button>
    </div>
  );
};

export default Dashboard;
