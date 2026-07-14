import { FeatureGrid, PageCta, PageHero } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticFeature } from "@/lib/staticPage.types"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { BookOpen, FileText, Lightbulb, Rocket } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("SEO")
  return buildPageMetadata({
    locale,
    path: "/career-resources",
    title: t("career-resources-title"),
    description: t("career-resources-description"),
  })
}

export default async function CareerResourcesPage() {
  await requirePageVisible("careerResources")
  const t = await getTranslations("CareerResourcesPage")
  const features = t.raw("features") as StaticFeature[]

  return (
    <div className="page-stack">
      <PageHero
        subtitle={t("subtitle")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        description={t("description")}
      />
      <div className="page-container max-w-6xl space-y-8">
        <FeatureGrid items={features} icons={[BookOpen, FileText, Lightbulb, Rocket]} />
        <PageCta
          title={t("cta.title")}
          description={t("cta.description")}
          primaryLabel={t("cta.primary")}
          primaryHref="/jobs"
          secondaryLabel={t("cta.secondary")}
          secondaryHref="/signup"
        />
      </div>
    </div>
  )
}
