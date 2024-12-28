import * as React from "react";
import {
  Circle,
  CircleArrowOutUpRight as CircleArrowOutUpRightIcon,
  CircleCheck,
  CirclePause,
  Inbox,
  MessageCircleDashed,
  MessagesSquare,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@kyakujs/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "All tickets",
      url: "#",
      icon: MessagesSquare,
      items: [],
    },
    {
      title: "Your tickets",
      url: "#",
      icon: Inbox,
      items: [],
    },
    {
      title: "Unassigned tickets",
      url: "#",
      icon: MessageCircleDashed,
      items: [],
    },
    {
      title: "Todo",
      url: "#",
      icon: Circle,
      items: [
        {
          title: "Needs first response",
          url: "#",
        },
        {
          title: "Needs next response",
          url: "#",
        },
        {
          title: "Investigating",
          url: "#",
        },
        {
          title: "Close the loop",
          url: "#",
        },
      ],
    },
    {
      title: "Snoozed",
      url: "#",
      icon: CirclePause,
      items: [
        {
          title: "Waiting for customer",
          url: "#",
        },
        {
          title: "Paused for later",
          url: "#",
        },
      ],
    },
    {
      title: "Done",
      url: "#",
      icon: CircleCheck,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <CircleArrowOutUpRightIcon className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-semibold">Kyaku</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    <item.icon />
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
