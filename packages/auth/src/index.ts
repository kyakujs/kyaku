import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, jwt, username } from "better-auth/plugins";

import { db } from "@kyakujs/db";

export type Session = typeof auth.$Infer.Session;

const auth = betterAuth({
  baseURL: process.env.VITE_APP_BASE_URL,
  secret: process.env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  account: {
    // TODO: Manually Linking Accounts: https://www.better-auth.com/docs/concepts/users-accounts#manually-linking-accounts
    accountLinking: {
      enabled: true,
      trustedProviders: ["github"],
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },
  plugins: [jwt(), username(), admin()],
});

export { auth };
