import { routing } from "@/i18n/routing";
import { getCmsContent } from "@/lib/getCmsContent";
import { getSiteUrl } from "@/lib/siteUrl";
import type { GeneralCmsContent } from "@/types/cms.types";
import type { Metadata } from "next";

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

export function resolveAssetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const base = getSiteUrl();
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

export function parseKeywords(value: string): string[] | undefined {
  const keywords = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return keywords.length ? keywords : undefined;
}

export function buildSeoAssets(general: GeneralCmsContent) {
  const keywords = parseKeywords(general.keywords);
  const faviconUrl = resolveAssetUrl(general.faviconUrl);
  const ogImageUrl = resolveAssetUrl(general.ogImageUrl);

  return {
    keywords,
    faviconUrl,
    ogImageUrl,
    siteName: general.siteName,
  };
}

export function buildRootMetadata({
  locale,
  general,
}: {
  locale: string;
  general: GeneralCmsContent;
}): Metadata {
  const base = getSiteUrl();
  const { keywords, faviconUrl, ogImageUrl, siteName } = buildSeoAssets(general);
  const siteDescription = general.siteDescription;

  return {
    metadataBase: new URL(base),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords,
    alternates: buildLocaleAlternates("/"),
    icons: {
      icon: [{ url: faviconUrl }],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: siteName,
      description: siteDescription,
      url: `${base}/${locale}`,
      siteName,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => (item === "ar" ? "ar_SA" : "en_US")),
      type: "website",
      images: [
        {
          url: ogImageUrl,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function buildPageMetadata({
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
}): Promise<Metadata> {
  const cms = await getCmsContent(locale);
  const { keywords, ogImageUrl, siteName } = buildSeoAssets(cms.general);
  const base = getSiteUrl();
  const canonical = `${base}${localizedPath(locale, path)}`;
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";
  const alternateLocale = routing.locales
    .filter((item) => item !== locale)
    .map((item) => (item === "ar" ? "ar_SA" : "en_US"));

  return {
    title,
    description,
    keywords,
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
      siteName,
      locale: ogLocale,
      alternateLocale,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export async function noIndexMetadata(
  locale: string,
  path: string,
  title: string
): Promise<Metadata> {
  return buildPageMetadata({
    locale,
    path,
    title,
    description: title,
    index: false,
  });
}
