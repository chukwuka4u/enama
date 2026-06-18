"use client"
import { 
  SquarePen,
  Trash,
  Ellipsis
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
import { v4 as uuidv4 } from "uuid"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"


export interface ChatProps{
  id: string,
  title: string,
  messages: {role: string, content: string}[]
}

export function AppSidebar() {
  const { state } = useSidebar();
  const [savedChat, setSavedChat] = useState<ChatProps[]>([]);
  const collapsed = state === 'collapsed';

  const fetchSavedChat = async () => {
      for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.startsWith("chat") && key) {
        const stringChat = localStorage.getItem(key)
        const chat = JSON.parse(stringChat!)
        setSavedChat(prev => [...prev, ...chat])
      }
    }
  }

  const createNewChat = function () {
    const newChat = {
      id: uuidv4(),
      title: "Untitled",
      messages: []
    }
    // localStorage.setItem(`chat${newChat.id}`, JSON.stringify(newChat))
    console.log(newChat)
    // return newChat;
  }

  const deleteAllChat = () => {
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (!key) continue;

    //   if (key.startsWith("chat") && key) {
    //     localStorage.removeItem(key)
    //   }
    // }
    console.log("delete all chat")
  }

  const renameChat = (id : string, newTitle: string) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      if (key.includes(id) && key) {
        const chat = JSON.parse(localStorage.getItem(key)!)
        chat.title = newTitle;
        localStorage.setItem(key, JSON.stringify(chat))
      }
    }
  }

  useEffect(() => {
    async function init() {
      await fetchSavedChat();
    }
    init();
  }, [savedChat])
  // const items = savedChat;
  const items = [
    {title: "Untitled"}
  ];
  const actions = [
    { title: "New Chat ", method: createNewChat, icon: SquarePen },
    { title: "Delete All", method: deleteAllChat, icon: Trash },
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
                    <Button
                      onClick={() => {action.method()}}
                      className="hover:bg-sidebar-accent font-mono bg-white text-black" 
                    //   activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <action.icon className="h-4 w-4" />
                      {!collapsed && <span>{action.title}</span>}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "font-mono"}>HISTORY</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div className="flex flex-1 justify-between">
                    <Button 
                      onClick={() => {console.log("set the chat url, fetch the chat and show")}}
                      className="hover:bg-sidebar-accent font-mono bg-white text-black w-[300px] bg-transparent" 
                      //activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        {!collapsed &&
                          (
                            <span className="text-gray-500 text-sm">{item.title}</span>
                          )
                        }
                    </Button>
                    {!collapsed &&
                      (
                        <div
                          onClick={() => console.log("show rename and delete")}
                        >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Ellipsis className="h-4 w-4 z-10" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem className="flex justify-between font-mono">
                              Rename
                              <SquarePen />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-between font-mono">
                              Delete
                              <Trash />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                      )
                    }
                    </div>
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