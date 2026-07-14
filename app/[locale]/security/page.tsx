import { PageHero, PageSection, PageCta } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticSection } from "@/lib/staticPage.types"
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
    path: "/security",
    title: t("security-title"),
    description: t("security-description"),
  })
}

export default async function SecurityPage() {
  await requirePageVisible("security")
  const t = await getTranslations("SecurityPage")
  const sections = t.raw("sections") as StaticSection[]

  return (
    <div className="page-stack">
      <PageHero
        subtitle={t("subtitle")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        description={t("description")}
      />
      <div className="page-container max-w-3xl space-y-6">
        {sections.map((section) => (
          <PageSection key={section.title} title={section.title} paragraphs={section.paragraphs} />
        ))}
        <PageCta
          title={t("cta.title")}
          description={t("cta.description")}
          primaryLabel={t("cta.primary")}
          primaryHref="/contact-us"
          secondaryLabel={t("cta.secondary")}
          secondaryHref="/privacy"
        />
      </div>
    </div>
  )
}
