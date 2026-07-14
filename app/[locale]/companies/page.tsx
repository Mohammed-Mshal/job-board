import CompanySearchForm from "@/components/Forms/CompanySearchForm"
import CompanyList from "@/components/CompanyList/CompanyList"
import { requirePageVisible } from "@/lib/getCmsContent"
import { buildPageMetadata } from "@/lib/seo"
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
    path: "/companies",
    title: t("companies-title"),
    description: t("companies-description"),
  })
}

export default async function CompaniesPage() {
  await requirePageVisible("companies");

  return (
    <div className="companies-page">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-2 xl:max-w-7xl">
        <div className="base-filter flex justify-center">
          <CompanySearchForm />
        </div>
        <CompanyList />
      </div>
    </div>
  )
}
