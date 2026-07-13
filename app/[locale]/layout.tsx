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
import { getCmsContent } from "@/lib/getCmsContent";

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

  return {
    title: cms.general.siteName,
    description: cms.general.siteDescription,
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

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn("h-full", "antialiased", CairoFont.variable)}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProviders>
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
          />
          <Toaster position="top-center" containerStyle={{ zIndex: 99999 }} />
          </AuthProvider>
        </LocaleProviders>
      </body>
    </html>
  );
}
