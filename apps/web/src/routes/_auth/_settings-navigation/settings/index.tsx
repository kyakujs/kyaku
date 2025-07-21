import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_settings-navigation/settings/")({
  ssr: false,
  beforeLoad: () => {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: "/settings/account/preferences",
    });
  },
});
