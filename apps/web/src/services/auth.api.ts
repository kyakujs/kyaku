import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import type { Session } from "@kyakujs/auth";

import { auth } from "~/components/auth/server";

export interface Authenticated extends Session {
  isAuthenticated: true;
}

export interface Unauthenticated {
  isAuthenticated: false;
}

export type Auth = Authenticated | Unauthenticated;

export const getAuth = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(),
  });

  return {
    auth: session
      ? {
          isAuthenticated: true as const,
          ...session,
        }
      : { isAuthenticated: false as const },
  };
});
