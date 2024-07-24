import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

console.log(process.env, 'db');

export default defineConfig({
    schema: "./schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
});
