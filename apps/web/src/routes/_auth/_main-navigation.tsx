import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SidebarProvider } from "@kyakujs/ui/sidebar";

import { AppSidebar } from "~/components/layout/sidebars/app-sidebar";

export const Route = createFileRoute("/_auth/_main-navigation")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-svh w-full overflow-hidden lg:p-2">
        <div className="flex h-full w-full overflow-hidden bg-container lg:rounded-md lg:border">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
