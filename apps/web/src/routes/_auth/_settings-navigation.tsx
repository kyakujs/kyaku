import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@kyakujs/ui/sidebar";

import { SettingsSidebar } from "~/components/layout/sidebars/settings-sidebar";

export const Route = createFileRoute("/_auth/_settings-navigation")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
