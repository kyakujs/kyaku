import { mustGetQuery } from "@rocicorp/zero";
import { handleQueryRequest } from "@rocicorp/zero/server";
import { createFileRoute } from "@tanstack/react-router";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { queries } from "@kyakujs/zero/queries";
import { schema } from "@kyakujs/zero/schema";

import { auth } from "~/components/auth/server";

export const Route = createFileRoute("/api/zero/query")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await auth.api.getSession({
          headers: getRequestHeaders(),
        });
        const ctx = session ? { userId: session.user.id } : undefined;
        return Response.json(
          await handleQueryRequest({
            handler: (name, args) => {
              const query = mustGetQuery(queries, name);
              return query.fn({ args, ctx });
            },
            schema,
            request,
            userID: session?.user.id ?? null,
          }),
        );
      },
    },
  },
});
