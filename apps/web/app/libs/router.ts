import { lazy } from "react";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "../route-tree.gen";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

export const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );
