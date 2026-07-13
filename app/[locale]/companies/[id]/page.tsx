import {
  CompanyAboutSection,
  CompanyHeader,
  CompanyJobsSection,
} from "@/components/CompanyPage"
import { companyService } from "@/src/services/company.service"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface CompanyPageProps {
  params: Promise<{ id: string }>
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params
  const t = await getTranslations("CompanyPage")
  const locale = await getLocale()

  let data
  try {
    data = await companyService.getCompanyById(id)
  } catch {
    return notFound()
  }

  if (!data) return notFound()

  const { company, jobs } = data
  const memberSince = company.createdAt
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "short",
      }).format(new Date(company.createdAt))
    : "--"

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8 xl:max-w-7xl">
      <CompanyHeader
        company={company}
        memberSince={memberSince}
        labels={{
          teamSize: t("team-size"),
          people: t("people"),
          openJobs: t("open-jobs"),
          memberSince: t("member-since"),
        }}
      />
      <CompanyAboutSection company={company} label={t("about")} />
      <CompanyJobsSection
        jobs={jobs}
        labels={{
          title: t("open-positions"),
          empty: t("no-open-positions"),
        }}
      />
    </div>
  )
}
