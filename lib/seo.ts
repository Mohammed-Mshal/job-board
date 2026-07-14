import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/siteUrl";
import type { Metadata } from "next";

type AppLocale = (typeof routing.locales)[number];

export function localizedPath(locale: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function buildLocaleAlternates(path: string) {
  const base = getSiteUrl();
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${base}${localizedPath(locale, path)}`;
  }

  return { languages };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  index?: boolean;
}): Metadata {
  const base = getSiteUrl();
  const canonical = `${base}${localizedPath(locale, path)}`;
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";
  const alternateLocale = routing.locales
    .filter((item) => item !== locale)
    .map((item) => (item === "ar" ? "ar_SA" : "en_US"));

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(path).languages,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: title.split("|")[0]?.trim() ?? title,
      locale: ogLocale,
      alternateLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function noIndexMetadata(locale: string, path: string, title: string): Metadata {
  return buildPageMetadata({
    locale,
    path,
    title,
    description: title,
    index: false,
  });
}
