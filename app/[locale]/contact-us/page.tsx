import { ContactForm, ContactHero, ContactInfo } from "@/components/ContactPage"
import { getCmsContent } from "@/lib/getCmsContent"

export default async function ContactUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cms = await getCmsContent(locale);

  return (
    <div className="contact-us-page space-y-8 pb-20 lg:space-y-12">
      <ContactHero content={cms.contact.hero} />
      <section className="container mx-auto px-4 xl:max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <ContactInfo content={cms.contact.info} />
        </div>
      </section>
    </div>
  )
}
