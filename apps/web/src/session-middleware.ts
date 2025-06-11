import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import type { Session } from "@kyakujs/auth";
import { auth } from "@kyakujs/auth";

export default createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getWebRequest();

    const session = await auth.api.getSession({
      headers: request.headers,
      asResponse: true,
    });

    return next({
      context: {
        auth:
          session.ok && session.body !== null
            ? {
                isAuthenticated: true as const,
                ...(await (session.json() as Promise<Session>)),
                jwt: session.headers.get("set-auth-jwt"),
              }
            : { isAuthenticated: false as const },
      },
    });
  },
);
