import { PageHero, PageSection } from "@/components/StaticPage"
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
    path: "/terms",
    title: t("terms-title"),
    description: t("terms-description"),
  })
}

export default async function TermsPage() {
  await requirePageVisible("terms")
  const t = await getTranslations("TermsPage")
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
        <p className="text-caption">{t("lastUpdated")}</p>
        {sections.map((section) => (
          <PageSection key={section.title} title={section.title} paragraphs={section.paragraphs} />
        ))}
      </div>
    </div>
  )
}
