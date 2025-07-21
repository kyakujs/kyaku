"use client";

import { useMemo } from "react";
import { ZeroProvider as ZeroProviderPrimitive } from "@rocicorp/zero/react";

import { schema } from "@kyakujs/zero/schema";

import { useAuth } from "~/components/auth-provider";

export function ZeroProvider({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();

  const opts = useMemo(
    () => ({
      schema,
      userID: user?.id ?? "anon",
      auth: async (error?: "invalid-token") => {
        if (error) {
          await fetch("/api/auth/refresh", {
            credentials: "include",
          });
        }
        return token;
      },
      server: import.meta.env.VITE_SYNC_ENGINE_URL as string,
    }),
    [user?.id, token],
  );

  return <ZeroProviderPrimitive {...opts}>{children}</ZeroProviderPrimitive>;
}
