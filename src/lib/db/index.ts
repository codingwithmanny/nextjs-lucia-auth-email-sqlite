// Imports
// =================================
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { env } from "@/env";
import * as schema from './schema';

// Config
// =================================
const sqlite = new Database(env.DATABASE_URL);
const db = drizzle(sqlite, { schema });

// Exports
// =================================
export default db;