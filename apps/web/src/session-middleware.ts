import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { auth } from "@kyakujs/auth";

export default createMiddleware().server(async ({ next }) => {
  const request = getWebRequest();
  if (!request) {
    throw new Error("Request not found");
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  return next({
    context: {
      auth:
        session !== null
          ? { isAuthenticated: true as const, ...session }
          : { isAuthenticated: false as const },
    },
  });
});
