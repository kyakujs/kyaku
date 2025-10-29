import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { Button } from "@kyakujs/ui/button";

import { authClient } from "~/components/auth/client";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch("/"),
  }),
  component: Login,
  ssr: false,
});

function Login() {
  const search = Route.useSearch();

  return (
    <div className="bg-backround">
      <main className="mx-auto flex max-w-80 flex-col items-center gap-6 py-4 sm:py-12">
        <span className="text-2xl font-semibold">Login to Kyaku</span>
        <div>
          <Button
            type="button"
            onClick={() => {
              void authClient.signIn.social({
                provider: "github",
                callbackURL: search.redirect,
              });
            }}
          >
            Continue with GitHub
          </Button>
        </div>
      </main>
    </div>
  );
}
