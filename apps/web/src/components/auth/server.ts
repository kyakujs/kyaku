import { tanstackStartCookies } from "better-auth/tanstack-start";

import { initAuth } from "@kyakujs/auth";

export const auth = initAuth({
  baseUrl: process.env.VITE_APP_BASE_URL as string,
  secret: process.env.AUTH_SECRET as string,
  githubClientId: process.env.AUTH_GITHUB_ID as string,
  githubClientSecret: process.env.AUTH_GITHUB_SECRET as string,

  extraPlugins: [tanstackStartCookies()],
});
