import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDownIcon,
  CircleArrowOutUpRightIcon,
  CircleCheckIcon,
  CircleIcon,
  CirclePauseIcon,
  InboxIcon,
  MessageCircleDashedIcon,
  MessagesSquareIcon,
  SearchIcon,
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
} from "@kyakujs/ui/sidebar";

import { WorkspaceMenu } from "~/components/layout/sidebars/workspace-menu";

const data = {
  workspace: [
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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton className="w-fit px-1.5">
                    <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                      <CircleArrowOutUpRightIcon className="size-3" />
                    </div>
                    <span className="truncate font-semibold">Kyaku</span>
                    <ChevronDownIcon className="opacity-50" />
                  </SidebarMenuButton>
                }
              ></DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-48">
                <WorkspaceMenu />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="/search">
              <SearchIcon />
              <span>Search</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarMenu></SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.workspace.map((item) => (
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
    </Sidebar>
  );
}
