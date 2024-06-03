// Imports
// =================================
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// Tables
// =================================
/**
 * Main user table
 */
export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
});

/**
 * Main session table
 */
export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull()
});