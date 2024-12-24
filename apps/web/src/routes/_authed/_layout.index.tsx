import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";

import type { Schema } from "@kyakujs/zero/schema";

export const Route = createFileRoute("/_authed/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const z = useZero<Schema>();
  const [tickets] = useQuery(z.query.ticket);
  return (
    <div>
      Hello "/admin"!
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
}
