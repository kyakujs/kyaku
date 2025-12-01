import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_main-navigation/")({
  ssr: false,
  beforeLoad: () => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: "/tickets/all",
    });
  },
});
