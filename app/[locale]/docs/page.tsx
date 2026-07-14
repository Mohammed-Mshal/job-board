import { DocsLinks, PageHero, PageSection } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticDocLink, StaticSection } from "@/lib/staticPage.types"
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
    path: "/docs",
    title: t("docs-title"),
    description: t("docs-description"),
  })
}

export default async function DocsPage() {
  await requirePageVisible("docs")
  const t = await getTranslations("DocsPage")
  const intro = t.raw("intro") as StaticSection
  const links = t.raw("links") as StaticDocLink[]

  return (
    <div className="page-stack">
      <PageHero
        subtitle={t("subtitle")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        description={t("description")}
      />
      <div className="page-container max-w-5xl space-y-8">
        <PageSection title={intro.title} paragraphs={intro.paragraphs} />
        <DocsLinks items={links} />
      </div>
    </div>
  )
}
