import { createFileRoute } from "@tanstack/react-router";

import { AppPageHeader } from "~/components/app-page-header";

export const Route = createFileRoute(
  "/_auth/_main-navigation/tickets/needs-next-response",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppPageHeader>
        <h2 className="text-sm">Needs next response</h2>
      </AppPageHeader>
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
