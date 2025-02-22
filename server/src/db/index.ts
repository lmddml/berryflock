import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { createUser } from "./queries/insert.ts";
console.log(Deno.env.get("DATABASE_URL"))
// Use pg driver.
const { Pool } = pg;

export const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
});

createUser({
  name: "Alice",
  email: "",
  age: 0,
});
