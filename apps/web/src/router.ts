import { lazy } from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  createRouter as createTanStackRouter,
  isRedirect,
} from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { routeTree } from "./route-tree.gen";

export interface RouterContext {
  queryClient: QueryClient;
}

export function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

  const routerContext: RouterContext = {
    queryClient,
  };

  const router = createTanStackRouter({
    routeTree,
    context: routerContext,
    search: {
      strict: true,
    },
    defaultPreload: false,
    scrollRestoration: true,
  });

  // handle redirect without useServerFn when using tanstack query
  queryClient.getQueryCache().config.onError = handleRedirectError;
  queryClient.getMutationCache().config.onError = handleRedirectError;

  function handleRedirectError(error: Error) {
    if (isRedirect(error)) {
      error.options._fromLocation = router.state.location;
      void router.navigate(router.resolveRedirect(error).options);
    }
  }

  // expose router and query client to window for use outside React (e.g. for Better Auth)
  if (typeof window !== "undefined") {
    window.getRouter = () => router;
    window.getQueryClient = () => queryClient;
  }

  return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

declare global {
  interface Window {
    getRouter: () => ReturnType<typeof createRouter>;
    getQueryClient: () => QueryClient;
  }
}

export const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );
