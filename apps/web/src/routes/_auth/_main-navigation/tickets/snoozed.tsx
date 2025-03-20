import { createFileRoute } from "@tanstack/react-router";

import { Header } from "~/components/layout/headers/tickets/header";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/snoozed")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <>
      <Header>
        <h2 className="text-sm">Snoozed</h2>
      </Header>
      <div className="h-[calc(100svh-40px)] w-full overflow-auto lg:h-[calc(100svh-56px)]">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </div>
    </>
  );
}
