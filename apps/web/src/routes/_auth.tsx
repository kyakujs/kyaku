"use client";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AuthProvider, useAuth } from "~/components/auth-provider";
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
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

function Auth() {
  const { isPending } = useAuth();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <ZeroProvider>
      <Outlet />
    </ZeroProvider>
  );
}
