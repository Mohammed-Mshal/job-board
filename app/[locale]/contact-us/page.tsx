import { ContactForm, ContactHero, ContactInfo } from "@/components/ContactPage"
import { getCmsContent, requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("SEO");

  return buildPageMetadata({
    locale,
    path: "/contact-us",
    title: t("contact-title"),
    description: t("contact-description"),
  });
}

export default async function ContactUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await requirePageVisible("contact");
  const cms = await getCmsContent(locale);

  return (
    <div className="contact-us-page page-stack">
      <ContactHero content={cms.contact.hero} />
      <section className="page-container">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <ContactInfo content={cms.contact.info} />
        </div>
      </section>
    </div>
  )
}
