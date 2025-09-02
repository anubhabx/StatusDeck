"use client";

import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

const SidebarComponent = () => {
  return (
    <Sidebar className="border-l px-4">
      <SidebarHeader className="flex flex-col items-center justify-center border-b">
        <SidebarInset className="flex flex-row justify-between items-center gap-2 py-2">
          <span>StatusDeck</span>
          <SidebarTrigger />
        </SidebarInset>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    Settings
                  </Button>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/reports">
                  <Button variant="ghost" className="w-full justify-start">
                    Reports
                  </Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/users">
                  <Button variant="ghost" className="w-full justify-start">
                    Users
                  </Button>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/projects">
                  <Button variant="ghost" className="w-full justify-start">
                    Projects
                  </Button>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/teams">
                  <Button variant="ghost" className="w-full justify-start">
                    Teams
                  </Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t py-4">
        <SidebarInset className="flex flex-col items-center justify-center gap-2">
          <span className="text-sm">© 2024 StatusDeck</span>
        </SidebarInset>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
