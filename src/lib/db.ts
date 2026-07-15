import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.");
}

declare global {
  // eslint-disable-next-line no-var
  var __lliDbClient: ReturnType<typeof createClient> | undefined;
}

export const db =
  global.__lliDbClient ?? createClient({ url, authToken });

if (process.env.NODE_ENV !== "production") {
  global.__lliDbClient = db;
}
