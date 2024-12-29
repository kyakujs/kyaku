import * as React from "react";
import {
  CircleArrowOutUpRight as CircleArrowOutUpRightIcon,
  CircleCheck as CircleCheckIcon,
  Circle as CircleIcon,
  CirclePause as CirclePauseIcon,
  Inbox as InboxIcon,
  MessageCircleDashed as MessageCircleDashedIcon,
  MessagesSquare as MessagesSquareIcon,
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
      icon: CirclePauseIcon,
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
