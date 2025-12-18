import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDownIcon,
  CircleArrowOutUpRightIcon,
  InboxIcon,
  MessageCircleDashedIcon,
  MessagesSquareIcon,
  SearchIcon,
} from "lucide-react";

import { Menu, MenuPopup, MenuTrigger } from "@kyakujs/ui/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@kyakujs/ui/sidebar";

import { WorkspaceMenu } from "~/components/layout/sidebars/workspace-menu";

const data = {
  workspace: [
    {
      title: "My tickets",
      url: "/tickets/yours",
      icon: InboxIcon,
      items: [],
    },
    {
      title: "All tickets",
      url: "/tickets/all",
      icon: MessagesSquareIcon,
      items: [],
    },
    {
      title: "Not assigned",
      url: "/tickets/unassigned",
      icon: MessageCircleDashedIcon,
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
            <Menu>
              <MenuTrigger
                render={
                  <SidebarMenuButton className="w-fit px-1.5">
                    <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                      <CircleArrowOutUpRightIcon className="size-3" />
                    </div>
                    <span className="truncate font-semibold">Kyaku</span>
                    <ChevronDownIcon className="opacity-50" />
                  </SidebarMenuButton>
                }
              />

              <MenuPopup align="start" className="min-w-48">
                <WorkspaceMenu />
              </MenuPopup>
            </Menu>
          </SidebarMenuItem>
          <SidebarMenuButton
            render={
              <Link to="/search">
                <SearchIcon />
                <span>Search</span>
              </Link>
            }
          />
        </SidebarMenu>
        <SidebarMenu></SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.workspace.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={
                    <Link to={item.url} className="font-medium">
                      <item.icon />
                      {item.title}
                    </Link>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
