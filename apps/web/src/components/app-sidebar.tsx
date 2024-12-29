import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  CircleArrowOutUpRightIcon,
  CircleCheckIcon,
  CircleIcon,
  CirclePauseIcon,
  InboxIcon,
  MessageCircleDashedIcon,
  MessagesSquareIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@kyakujs/ui/dropdown-menu";
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

import { AppSidebarDropdownMenu } from "~/components/app-sidebar-dropdown-menu";

const data = {
  navMain: [
    {
      title: "All tickets",
      url: "/tickets/all",
      icon: MessagesSquareIcon,
      items: [],
    },
    {
      title: "Your tickets",
      url: "/tickets/yours",
      icon: InboxIcon,
      items: [],
    },
    {
      title: "Unassigned tickets",
      url: "/tickets/unassigned",
      icon: MessageCircleDashedIcon,
      items: [],
    },
    {
      title: "Todo",
      url: "/tickets/todo",
      icon: CircleIcon,
      items: [
        {
          title: "Needs first response",
          url: "/tickets/needs-first-response",
        },
        {
          title: "Needs next response",
          url: "/tickets/needs-next-response",
        },
        {
          title: "Investigating",
          url: "/tickets/investigating",
        },
        {
          title: "Close the loop",
          url: "/tickets/close-the-loop",
        },
      ],
    },
    {
      title: "Snoozed",
      url: "/tickets/snoozed",
      icon: CirclePauseIcon,
      items: [
        {
          title: "Waiting for customer",
          url: "/tickets/waiting-for-customer",
        },
        {
          title: "Paused for later",
          url: "/tickets/paused-for-later",
        },
      ],
    },
    {
      title: "Done",
      url: "/tickets/done",
      icon: CircleCheckIcon,
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
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <CircleArrowOutUpRightIcon className="size-4" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="font-semibold">Kyaku</span>
                    </div>
                  </SidebarMenuButton>
                }
              ></DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-48">
                <AppSidebarDropdownMenu />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium">
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={item.url}>{item.title}</Link>
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
