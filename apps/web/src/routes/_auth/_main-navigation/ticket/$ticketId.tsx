import { Zero } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";

import type { Schema } from "@kyakujs/zero/schema";
import { schema } from "@kyakujs/zero/schema";

export const Route = createFileRoute(
  "/_auth/_main-navigation/ticket/$ticketId",
)({
  loader: ({ context, params }) => {
    const z = new Zero({
      userID: context.auth.isAuthenticated ? context.auth.user.id : "",
      auth: context.auth.isAuthenticated ? (context.auth.jwt ?? "") : "",
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
  const [data] = useQuery(z.query.ticket.where("id", ticketId).one());
  return (
    <div>
      <h2>{data?.id}</h2>
      <p>{data?.title}</p>
    </div>
  );
}
