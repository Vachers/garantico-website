import { cookies } from "next/headers";
import { db } from "./db";
import { adminUsers } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key-change-in-production";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSession(userId: number): Promise<string> {
  // Simple session token (in production, use JWT or proper session store)
  const sessionToken = Buffer.from(`${userId}:${Date.now()}:${SESSION_SECRET}`).toString("base64");
  return sessionToken;
}

export async function verifySession(sessionToken: string): Promise<number | null> {
  try {
    const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
    const [userId] = decoded.split(":");
    return parseInt(userId) || null;
  } catch {
    return null;
  }
}

export async function login(username: string, password: string) {
  const user = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (user.length === 0) {
    return { success: false, message: "Invalid credentials" };
  }

  const isValid = await verifyPassword(password, user[0].password);
  if (!isValid) {
    return { success: false, message: "Invalid credentials" };
  }

  // Update last login
  await db
    .update(adminUsers)
    .set({ lastLogin: new Date() })
    .where(eq(adminUsers.id, user[0].id));

  const sessionToken = await createSession(user[0].id);
  return { success: true, sessionToken, userId: user[0].id };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  const userId = await verifySession(sessionToken);
  if (!userId) {
    return null;
  }

  const user = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, userId))
    .limit(1);

  return user[0] || null;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

