"use client";

import { ENDPOINTS } from "@/constants/endpoints";
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "@/lib/csrf.constants";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

function readCsrfCookie(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export async function ensureCsrfToken(): Promise<string | null> {
  const existing = readCsrfCookie();
  if (existing) {
    return existing;
  }

  await fetch(`${getBaseUrl()}${ENDPOINTS.AUTH.CSRF}`, {
    credentials: "include",
  });

  return readCsrfCookie();
}

export function getCsrfTokenFromCookie(): string | null {
  return readCsrfCookie();
}

export { CSRF_HEADER_NAME };
