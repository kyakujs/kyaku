import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { auth } from "@kyakujs/auth";

export default createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getWebRequest();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return next({
      context: {
        auth: session
          ? {
              isAuthenticated: true as const,
              ...session,
            }
          : { isAuthenticated: false as const },
      },
    });
  },
);
