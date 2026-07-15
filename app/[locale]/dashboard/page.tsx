import CompanyDashboardContent from "@/components/CompanyPage/CompanyDashboardContent"
import { noIndexMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("SEO")
  return noIndexMetadata(locale, "/dashboard", t("dashboard-title"))
}

export default function DashboardPage() {
  return <CompanyDashboardContent />
}
