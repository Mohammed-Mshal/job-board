import { HelpFaq, PageCta, PageHero } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticFaq } from "@/lib/staticPage.types"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("SEO")
  return buildPageMetadata({
    locale,
    path: "/help",
    title: t("help-title"),
    description: t("help-description"),
  })
}

export default async function HelpPage() {
  await requirePageVisible("help")
  const t = await getTranslations("HelpPage")
  const faqs = t.raw("faqs") as StaticFaq[]

  return (
    <div className="page-stack">
      <PageHero
        subtitle={t("subtitle")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        description={t("description")}
      />
      <div className="page-container max-w-3xl space-y-8">
        <HelpFaq items={faqs} />
        <PageCta
          title={t("cta.title")}
          description={t("cta.description")}
          primaryLabel={t("cta.primary")}
          primaryHref="/contact-us"
          secondaryLabel={t("cta.secondary")}
          secondaryHref="/docs"
        />
      </div>
    </div>
  )
}
