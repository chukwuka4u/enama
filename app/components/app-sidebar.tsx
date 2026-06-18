"use client"
import { 
  SquarePen,
  Trash,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const { state } = useSidebar();
  const [savedChat, setSavedChat] = useState<{title : string, uuid : string}[]>([]);
  const collapsed = state === 'collapsed';

  const fetchSavedChat = async () => {
    const chatRegex = /^chatHistory#([^#]+)#([^#]+)$/;

       for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        const match = key?.match(chatRegex);
        if (match) {
        const title = match[1]; // First capturing group ([^#]+)
        const uuid = match[2];  // Second capturing group ([^#]+)
    
        // 5. Store the extracted data in the state
        setSavedChat((prev) => [...prev, {title, uuid}]);
      }
    }
  }
  useEffect(() => {
    async function init() {
      await fetchSavedChat();
    }
    init();
  }, [savedChat])
  const items = savedChat;
  const actions = [
    { title: "New Chat ", url: "/student", icon: SquarePen },
    { title: "Delete All", url: "/student/results", icon: Trash },
  ];


  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4 font-mono">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-6">
                      <a href="#" className="font-bold">
                        <Image
                            src="/screen.png"
                            alt="Enama Logo"
                            width={60}
                            height={60}
                         />
                      </a>
                    </div>
            <div>
              <div className="flex items-center gap-6">
                <a href="#" className="font-bold">
                  <Image
                      src="/enama_logo_anthropic_style.png"
                      alt="Enama Logo"
                      width={60}
                      height={60}
                  />
                </a>
              </div>
            </div>
          </div>
        )}
        {collapsed && 
          <div className="flex items-center gap-6">
            <a href="#" className="font-bold">
              <Image
                  src="/screen.png"
                  alt="Enama Logo"
                  width={100}
                  height={100}
                />
            </a>
          </div>
        }
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {actions.map((action) => (
                <SidebarMenuItem key={action.title} className="rounded-md border border-2 hover:border-black">
                  <SidebarMenuButton asChild>
                    <a 
                      href={action.url}
                      className="hover:bg-sidebar-accent font-mono" 
                    //   activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <action.icon className="h-4 w-4" />
                      {!collapsed && <span>{action.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "font-mono"}>HISTORY</SidebarGroupLabel>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "font-mono"}>TODAY</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={"/student"}
                      className="hover:bg-sidebar-accent font-mono" 
                    //   activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      {!collapsed && <span className="text-gray-500 text-sm">{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}