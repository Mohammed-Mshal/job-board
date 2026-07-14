import "server-only";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "@/lib/csrf.constants";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const CSRF_EXEMPT_PATHS = new Set(["/api/v1/csrf"]);

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function setCsrfCookie(): Promise<string> {
  const token = generateToken();
  const cookieStore = await cookies();

  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return token;
}

export function shouldValidateCsrf(request: NextRequest): boolean {
  if (!MUTATING_METHODS.has(request.method)) {
    return false;
  }

  const path = new URL(request.url).pathname;
  return path.startsWith("/api/v1") && !CSRF_EXEMPT_PATHS.has(path);
}

export async function validateCsrf(request: NextRequest): Promise<void> {
  if (!shouldValidateCsrf(request)) {
    return;
  }

  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    throw apiError(403, API_ERROR_CODES.INVALID_CSRF_TOKEN);
  }
}
