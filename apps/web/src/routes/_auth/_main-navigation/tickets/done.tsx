import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@kyakujs/ui/separator";
import { SidebarTrigger } from "@kyakujs/ui/sidebar";

import { AppPageHeader } from "~/components/app-page-header";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/done")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppPageHeader>
        <h2 className="text-sm">Done</h2>
      </AppPageHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
