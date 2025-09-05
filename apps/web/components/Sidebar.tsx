"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuButton
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  Settings2Icon,
  User2Icon,
  Layers2Icon,
  Users2Icon,
  FoldersIcon,
  LogOutIcon
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

const generalMenuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { label: "Reports", href: "/reports", icon: Layers2Icon }
];

const managementMenuItems = [
  { label: "Monitors", href: "/monitors", icon: FoldersIcon },
  { label: "Teams", href: "/teams", icon: Users2Icon }
];

const SidebarComponent = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
    <Sidebar className="border-r px-4" collapsible="none">
      <SidebarHeader className="flex flex-col items-center justify-center border-b">
        <SidebarInset className="flex flex-row justify-between items-center gap-2 py-2">
          <span>StatusDeck</span>
        </SidebarInset>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-4 overflow-x-hidden overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center justify-between w-full">
              <span>General</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-1">
            {generalMenuItems.map((item) => (
              <SidebarMenu key={item.href}>
                <SidebarMenuItem>
                  <Link href={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start`}
                      >
                        {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                        {item.label}
                      </Button>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between w-full">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-1">
            <SidebarMenu>
              {managementMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                    <Button variant="ghost" className={`w-full justify-start`}>
                      {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                      {item.label}
                    </Button>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterComponent username={user?.name} email={user?.email} />
    </Sidebar>
  );
};

const SidebarFooterComponent = ({
  username,
  email
}: {
  username?: string;
  email?: string;
}) => {
  const router = useRouter();
  const { logout } = useAuthStore(); // Add this line

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  return (
    <SidebarFooter className="border-t py-4">
      <SidebarInset className="flex flex-col items-center justify-center gap-2">
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="w-full justify-start">
                <User2Icon className="w-4 h-4" />
                {username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <Link href="/profile" className="cursor-pointer">
                <DropdownMenuItem className="cursor-pointer">
                  <User2Icon className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" className="cursor-pointer">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings2Icon className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarInset>
    </SidebarFooter>
  );
};
export default SidebarComponent;
