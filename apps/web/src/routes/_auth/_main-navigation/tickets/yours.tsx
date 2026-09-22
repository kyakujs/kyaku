import { createFileRoute } from "@tanstack/react-router";

import { Header } from "~/components/layout/headers/tickets/header";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/yours")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  return (
    <div className="flex w-full flex-col">
      <Header>
        <h2 className="text-sm">Yours</h2>
      </Header>
      <div className="h-full w-full overflow-auto">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </div>
    </div>
  );
}
