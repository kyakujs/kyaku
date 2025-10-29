import type { ReadonlyJSONValue } from "@rocicorp/zero";
import { withValidation } from "@rocicorp/zero";
import { handleGetQueriesRequest } from "@rocicorp/zero/server";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { queries } from "@kyakujs/zero/queries";
import { schema } from "@kyakujs/zero/schema";

import { auth } from "~/components/auth/server";

const validated = Object.fromEntries(
  Object.values(queries).map((q) => [q.queryName, withValidation(q)]),
);

export const Route = createFileRoute("/api/zero/get-queries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await auth.api.getSession(request);
        const userID = session?.user.id;
        return json(
          await handleGetQueriesRequest(
            (name, args) => getQuery(userID, name, args),
            schema,
            request,
          ),
        );
      },
    },
  },
});

function getQuery(
  userID: string | undefined,
  name: string,
  args: readonly ReadonlyJSONValue[],
) {
  const q = validated[name];
  if (!q) {
    throw new Error("Unknown query: " + name);
  }
  return { query: q(userID, ...args) };
}
