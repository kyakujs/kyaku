import { Zero } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";

import type { Schema } from "@kyakujs/zero/schema";
import { schema } from "@kyakujs/zero/schema";

import { PrioritySelector } from "~/components/common/tickets/priority-selector";

export const Route = createFileRoute(
  "/_auth/_main-navigation/ticket/$ticketId",
)({
  loader: ({ context, params }) => {
    const z = new Zero({
      userID: context.auth.isAuthenticated ? context.auth.user.id : "",
      auth: context.auth.isAuthenticated ? context.auth.jwt : "",
      server: import.meta.env.VITE_SYNC_ENGINE_URL as string,
      schema,
      kvStore: "mem",
    });
    return z.query.ticket.where("id", params.ticketId).one().preload();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const z = useZero<Schema>();
  const { ticketId } = Route.useParams();
  const [ticket, ticketResult] = useQuery(
    z.query.ticket.related("timelineEntries").where("id", ticketId).one(),
  );

  if (ticketResult.type === "unknown") {
    return null;
  }

  if (ticket === undefined) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="flex w-full">
      <div className="flex grow flex-col">
        <header className="flex h-10 w-full items-center gap-2 border-b px-4">
          <h2 className="text-sm">TIC-{ticket.shortId}</h2>
        </header>
        <div className="flex h-full w-full">
          <div className="grow">
            <div className="m-auto max-w-[76ch]">
              {ticket.timelineEntries.map((entry) => (
                <div key={entry.id}>
                  <p>{entry.type}</p>
                  <p>{JSON.stringify(entry.entry)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-72 flex-col overflow-y-scroll border-l border-accent bg-sidebar-background p-6">
        <div className="mb-4">{ticket.title}</div>
        <div className="text-xs">{ticket.description}</div>
        {}
        <PrioritySelector priority={ticket.priority} />
      </div>
    </div>
  );
}
