"use client";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { ZeroProvider } from "~/components/zero-provider";

export const Route = createFileRoute("/_auth")({
  ssr: false,
  component: AuthLayout,
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
});

function AuthLayout() {
  return (
    <ZeroProvider>
      <Outlet />
    </ZeroProvider>
  );
}
