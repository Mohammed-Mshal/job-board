import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { NextRequest } from "next/server";

export type AppLocale = (typeof routing.locales)[number];

export function getRequestLocale(request?: NextRequest): AppLocale {
  const headerLocale = request?.headers.get("x-locale");
  if (headerLocale && hasLocale(routing.locales, headerLocale)) {
    return headerLocale;
  }

  const referer = request?.headers.get("referer");
  if (referer) {
    try {
      const pathname = new URL(referer).pathname;
      const match = pathname.match(/^\/(en|ar)(\/|$)/);
      if (match && hasLocale(routing.locales, match[1])) {
        return match[1];
      }
    } catch {
      // Ignore invalid referer URLs.
    }
  }

  const acceptLanguage = request?.headers.get("accept-language") ?? "";
  if (acceptLanguage.toLowerCase().includes("ar")) {
    return "ar";
  }

  return routing.defaultLocale;
}
