import { createServerFn } from "@tanstack/start";
import { getEvent } from "vinxi/http";

import type { Session } from "@kyakujs/auth";

export interface Authenticated extends Session {
  isAuthenticated: true;
}

export interface Unauthenticated {
  isAuthenticated: false;
}

export type Auth = Authenticated | Unauthenticated;

export const getAuth = createServerFn({ method: "GET" }).handler<Auth>(() => {
  const event = getEvent();

  return event.context.auth as Auth;
});
