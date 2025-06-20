import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema.js";

const client = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle({
  client,
  schema,
  casing: "snake_case",
});
