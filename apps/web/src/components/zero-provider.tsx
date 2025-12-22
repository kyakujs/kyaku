import type { Zero } from "@rocicorp/zero";
import { useCallback } from "react";
import { ZeroProvider as ZeroProviderPrimitive } from "@rocicorp/zero/react";
import { useRouter } from "@tanstack/react-router";

import { mutators } from "@kyakujs/zero/mutators";
import { schema } from "@kyakujs/zero/schema";

import { authClient } from "~/components/auth/client";

const cacheUrl = import.meta.env.VITE_PUBLIC_ZERO_CACHE_URL as string;

export function ZeroProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = authClient.useSession();
  const context = session.data ? { userId: session.data.user.id } : undefined;
  const userId = session.data?.user.id ?? "anon";

  const init = useCallback(
    (zero: Zero) => {
      router.update({
        context: {
          ...router.options.context,
          zero,
        },
      });
      void router.invalidate();
    },
    [router],
  );

  return (
    <ZeroProviderPrimitive
      {...{
        cacheURL: cacheUrl,
        context: context as unknown, // TODO: fix type issue
        init,
        mutators,
        schema,
        userID: userId,
      }}
    >
      {children}
    </ZeroProviderPrimitive>
  );
}
