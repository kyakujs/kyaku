import { mustGetQuery } from "@rocicorp/zero";
import { handleQueryRequest } from "@rocicorp/zero/server";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { queries } from "@kyakujs/zero/queries";
import { schema } from "@kyakujs/zero/schema";

import { auth } from "~/components/auth/server";

export const Route = createFileRoute("/api/zero/query")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await auth.api.getSession(request);
        const ctx = session ? { userId: session.user.id } : undefined;
        return json(
          await handleQueryRequest(
            (name, args) => {
              const query = mustGetQuery(queries, name);
              return query.fn({ args, ctx });
            },
            schema,
            request,
          ),
        );
      },
    },
  },
});
