import { FeatureGrid, PageCta, PageHero } from "@/components/StaticPage"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
import type { StaticFeature } from "@/lib/staticPage.types"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Bell, CheckCircle2, Clock, Send } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("SEO")
  return buildPageMetadata({
    locale,
    path: "/applications",
    title: t("applications-title"),
    description: t("applications-description"),
  })
}

export default async function ApplicationsPage() {
  await requirePageVisible("applications")
  const t = await getTranslations("ApplicationsPage")
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
        <FeatureGrid items={features} icons={[Send, Clock, Bell, CheckCircle2]} />
        <PageCta
          title={t("cta.title")}
          description={t("cta.description")}
          primaryLabel={t("cta.primary")}
          primaryHref="/profile"
          secondaryLabel={t("cta.secondary")}
          secondaryHref="/login"
        />
      </div>
    </div>
  )
}
