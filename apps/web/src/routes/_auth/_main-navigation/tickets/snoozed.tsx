import { createFileRoute } from "@tanstack/react-router";

import { Separator } from "@kyakujs/ui/separator";
import { SidebarTrigger } from "@kyakujs/ui/sidebar";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/snoozed")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 inline-flex group-has-[[data-state=collapsed]]/sidebar-wrapper:inline-flex md:hidden [&_svg]:size-4 [&_svg]:shrink-0" />
          <Separator className="mr-2 block h-4 w-[1px] group-has-[[data-state=collapsed]]/sidebar-wrapper:block md:hidden" />
          <h2 className="text-sm">Snoozed</h2>
        </div>
      </header>
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
