import { useMemo } from "react";
import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { schema } from "@kyakujs/zero/schema";

import { useAuthQuery } from "~/services/auth.query";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const authQuery = useAuthQuery();

  const z = useMemo(
    () =>
      new Zero({
        userID: authQuery.data.isAuthenticated ? authQuery.data.user.id : "",
        auth: authQuery.data.isAuthenticated
          ? () =>
              fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/token`)
                .then((res) => res.json() as Promise<{ token: string }>)
                .then((json) => json.token)
          : "",
        server: import.meta.env.VITE_SYNC_ENGINE_URL as string,
        schema,
        kvStore: "mem", // or "idb" for IndexedDB persistence
      }),
    [authQuery.data],
  );
  return (
    <ZeroProvider zero={z}>
      <Outlet />
    </ZeroProvider>
  );
}
