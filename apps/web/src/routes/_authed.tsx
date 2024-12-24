import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/sign-in",
      });
    }
  },
});
