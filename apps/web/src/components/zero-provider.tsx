"use client";

import { useMemo } from "react";
import { ZeroProvider as ZeroProviderPrimitive } from "@rocicorp/zero/react";

import { schema } from "@kyakujs/zero/schema";

import { authClient } from "~/components/auth/client";

export function ZeroProvider({ children }: { children: React.ReactNode }) {
  const session = authClient.useSession();

  const opts = useMemo(
    () => ({
      schema,
      userID: session.data?.user.id ?? "anon",
      cacheURL: import.meta.env.VITE_PUBLIC_ZERO_CACHE_URL as string,
    }),
    [session.data?.user.id],
  );

  return <ZeroProviderPrimitive {...opts}>{children}</ZeroProviderPrimitive>;
}
