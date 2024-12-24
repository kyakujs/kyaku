import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@kyakujs/ui/button";

import { authClient } from "~/libs/auth-client";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
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
                callbackURL: "/",
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
