import ProtectedPage from "@/components/ProtectedPage";
import SidebarComponent from "@/components/Sidebar";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div>
        <SidebarComponent />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
