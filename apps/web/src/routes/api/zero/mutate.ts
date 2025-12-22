import { mustGetMutator } from "@rocicorp/zero";
import { handleMutateRequest } from "@rocicorp/zero/server";
import { zeroPostgresJS } from "@rocicorp/zero/server/adapters/postgresjs";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import postgres from "postgres";

import { mutators } from "@kyakujs/zero/mutators";
import { schema } from "@kyakujs/zero/schema";

import { auth } from "~/components/auth/server";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dbProvider = zeroPostgresJS(schema, postgres(process.env.POSTGRES_URL!));

export const Route = createFileRoute("/api/zero/mutate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.log("mutate called");
        const session = await auth.api.getSession(request);

        if (!session) {
          return json({ error: "Unauthorized" }, { status: 401 });
        }

        const ctx = { userId: session.user.id };

        return json(
          await handleMutateRequest(
            dbProvider,
            async (transact) => {
              return await transact(async (tx, name, args) => {
                const mutator = mustGetMutator(mutators, name);
                return await mutator.fn({ tx, ctx, args });
              });
            },
            request,
          ),
        );
      },
    },
  },
});
