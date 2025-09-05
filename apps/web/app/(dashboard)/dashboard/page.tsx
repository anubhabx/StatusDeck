"use client";

import { account } from "@/lib/appwrite";
import { Button } from "@workspace/ui/components/button";
import React from "react";
import { toast } from "sonner";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Button
        onClick={() =>
          toast.promise(account.get(), {
            loading: "Loading account...",
            success: (account) => `Hello, ${account.name}`,
            error: (err) => `Error: ${err.message}`
          })
        }
      >
        Primary Button
      </Button>
    </div>
  );
};

export default Dashboard;
