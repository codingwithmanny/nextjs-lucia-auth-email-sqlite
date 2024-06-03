// Imports
// =================================
import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

// Main Drizzle Config
// =================================
export default defineConfig({
  schema: "src/lib/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
