"use client";

import { useMemo } from "react";
import { ZeroProvider as ZeroProviderPrimitive } from "@rocicorp/zero/react";

import { schema } from "@kyakujs/zero/schema";

import { authClient } from "~/libs/auth-client";

export function ZeroProvider({ children }: { children: React.ReactNode }) {
  const session = authClient.useSession();

  const opts = useMemo(
    () => ({
      schema,
      userID: session.data?.user.id ?? "anon",
      server: import.meta.env.VITE_SYNC_ENGINE_URL as string,
    }),
    [session.data?.user.id],
  );

  return <ZeroProviderPrimitive {...opts}>{children}</ZeroProviderPrimitive>;
}
