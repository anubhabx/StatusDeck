import SidebarComponent from "@/components/Sidebar";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarComponent />
        <div className="p-4 w-full">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
