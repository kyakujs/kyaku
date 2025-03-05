import { createServerFn } from "@tanstack/react-start";

import type { Session } from "@kyakujs/auth";

import sessionMiddleware from "~/session-middleware";

export interface Authenticated extends Session {
  isAuthenticated: true;
  jwt: string | null;
}

export interface Unauthenticated {
  isAuthenticated: false;
}

export type Auth = Authenticated | Unauthenticated;

export const getAuth = createServerFn({ method: "GET" })
  .middleware([sessionMiddleware])
  .handler<Auth>((ctx) => {
    return ctx.context.auth;
  });
