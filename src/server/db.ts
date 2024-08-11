import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "@/server/schema"

config({ path: ".env.local" });

console.log("database url: ", process.env.POSTGRES_URL);
const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql, {schema, logger: true});
