import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import 'swiper/css';
import 'swiper/css/bundle';
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import LocaleProviders from "@/providers/LocaleProviders";
import MobileMenu from "@/components/shared/Header/MobileMenu";
import { routing } from "@/i18n/routing";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import CsrfProvider from "@/providers/CsrfProvider";
import SiteVisibilityProvider from "@/providers/SiteVisibilityProvider";
import { filterFooterColumns } from "@/features/cms/cms.visibility";
import { footerColumns } from "@/components/shared/Footer/footer.config";
import { getCmsContent, getSiteVisibility } from "@/lib/getCmsContent";
import { buildLocaleAlternates } from "@/lib/seo";
import { getSiteUrl } from "@/lib/siteUrl";

const CairoFont = Cairo({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['normal'],
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo'
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const cms = await getCmsContent(locale);
  const siteName = cms.general.siteName;
  const siteDescription = cms.general.siteDescription;
  const base = getSiteUrl();

  return {
    metadataBase: new URL(base),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    alternates: buildLocaleAlternates("/"),
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
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const cms = await getCmsContent(locale);
  const visibility = await getSiteVisibility();
  const filteredFooterColumns = filterFooterColumns(footerColumns, visibility);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn("h-full", "antialiased", CairoFont.variable)}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProviders>
          <CsrfProvider>
          <SiteVisibilityProvider visibility={visibility}>
          <AuthProvider>
          <Header />
          <MobileMenu />
          <main className="flex-1">
            {children}
          </main>
          <Footer
            siteName={cms.general.siteName}
            siteDescription={cms.general.siteDescription}
            footerCopyright={cms.general.footerCopyright}
            footerTagline={cms.general.footerTagline}
            columns={filteredFooterColumns}
          />
          <Toaster position="top-center" containerStyle={{ zIndex: 99999 }} />
          </AuthProvider>
          </SiteVisibilityProvider>
          </CsrfProvider>
        </LocaleProviders>
      </body>
    </html>
  );
}
