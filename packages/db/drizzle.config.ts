import type { Config } from "drizzle-kit";

if (!process.env.ZERO_UPSTREAM_DB) {
  throw new Error("Missing ZERO_UPSTREAM_DB");
}

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.ZERO_UPSTREAM_DB },
  casing: "snake_case",
} satisfies Config;
