import { PageHero, PageSection, PricingCards } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticPricingPlan, StaticSection } from "@/lib/staticPage.types"
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
    path: "/pricing",
    title: t("pricing-title"),
    description: t("pricing-description"),
  })
}

export default async function PricingPage() {
  await requirePageVisible("pricing")
  const t = await getTranslations("PricingPage")
  const plans = t.raw("plans") as StaticPricingPlan[]
  const note = t.raw("note") as StaticSection

  return (
    <div className="page-stack">
      <PageHero
        subtitle={t("subtitle")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        description={t("description")}
      />
      <div className="page-container max-w-6xl space-y-8">
        <PricingCards plans={plans} />
        <PageSection title={note.title} paragraphs={note.paragraphs} />
      </div>
    </div>
  )
}
