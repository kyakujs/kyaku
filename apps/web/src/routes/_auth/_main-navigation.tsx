import { SidebarProvider } from "@kyakujs/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "~/components/layout/sidebars/app-sidebar";

export const Route = createFileRoute("/_auth/_main-navigation")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-svh w-full overflow-hidden lg:p-2">
        <div className="border-border bg-background flex h-full w-full overflow-hidden lg:rounded-md lg:border">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
