import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const DEFAULT_USER = process.env.ADMIN_USERNAME || "hamidadmin";
const DEFAULT_PASS = process.env.ADMIN_PASSWORD || "Hamidadmin123@@@";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET || "hadaq-al-khaleej-admin-secret-change-me";
  return new TextEncoder().encode(secret);
}

export function validateCredentials(username: string, password: string) {
  return username === DEFAULT_USER && password === DEFAULT_PASS;
}

export async function signAdminToken(username: string) {
  return new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

export async function requireAdmin(req: NextRequest) {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  return verifyAdminToken(token);
}
