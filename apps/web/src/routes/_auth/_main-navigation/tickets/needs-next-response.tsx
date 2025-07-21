import { createFileRoute } from "@tanstack/react-router";

import { Header } from "~/components/layout/headers/tickets/header";

export const Route = createFileRoute(
  "/_auth/_main-navigation/tickets/needs-next-response",
)({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  return (
    <div className="flex w-full flex-col">
      <Header>
        <h2 className="text-sm">Needs next response</h2>
      </Header>
      <div className="h-full w-full overflow-auto">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </div>
    </div>
  );
}
