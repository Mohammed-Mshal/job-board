import { FeatureGrid, PageCta, PageHero } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticFeature } from "@/lib/staticPage.types"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Briefcase, Filter, Search, Users } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("SEO")
  return buildPageMetadata({
    locale,
    path: "/candidates",
    title: t("candidates-title"),
    description: t("candidates-description"),
  })
}

export default async function CandidatesPage() {
  await requirePageVisible("candidates")
  const t = await getTranslations("CandidatesPage")
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
        <FeatureGrid items={features} icons={[Users, Search, Filter, Briefcase]} />
        <PageCta
          title={t("cta.title")}
          description={t("cta.description")}
          primaryLabel={t("cta.primary")}
          primaryHref="/signup"
          secondaryLabel={t("cta.secondary")}
          secondaryHref="/pricing"
        />
      </div>
    </div>
  )
}
