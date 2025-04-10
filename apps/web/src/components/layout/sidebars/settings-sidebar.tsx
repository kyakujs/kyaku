import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@kyakujs/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Account",
      items: [
        {
          title: "Preferences",
          url: "/settings/account/preferences",
        },
        {
          title: "Account",
          url: "/settings/account/profile",
        },
      ],
    },
  ],
};

export function SettingsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-fit px-1.5"
              render={
                /* TODO: return to previous page */
                <Link to="/">
                  <ChevronLeftIcon />
                  <span className="">Go back</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              {item.items.length ? (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuSubButton
                          render={<Link to={item.url}>{item.title}</Link>}
                        />
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              ) : null}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
