import type { Zero } from "@rocicorp/zero";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./route-tree.gen";

export interface RouterContext {
  queryClient: QueryClient;
  zero: Zero;
}

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
      zero: undefined as unknown as Zero,
    },
    defaultPreload: "intent",
    scrollRestoration: true,
    search: {
      strict: true,
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
