import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

// Configure Neon for better performance
neonConfig.fetchConnectionCache = true;

function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// Lazy initialization - only create connection when needed (at runtime, not build time)
let dbInstance: ReturnType<typeof getDatabase> | null = null;

export const db = new Proxy({} as ReturnType<typeof getDatabase>, {
  get(_target, prop) {
    if (!dbInstance) {
      dbInstance = getDatabase();
    }
    return (dbInstance as any)[prop];
  },
});
