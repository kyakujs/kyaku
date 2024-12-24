import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "~/libs/auth-client";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  return (
    <div className="bg-backround mx-auto max-w-2xl">
      <main className="py-4 sm:py-12">Sign in</main>
      <button
        type="button"
        onClick={() => {
          void authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
          });
        }}
      >
        GitHub
      </button>
    </div>
  );
}
