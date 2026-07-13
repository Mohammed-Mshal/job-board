import {
  CompanyAboutSection,
  CompanyHeader,
  CompanyJobsSection,
} from "@/components/CompanyPage"
import { companiesService } from "@/features/companies/companies.services"
import connectDB from "@/lib/db"
import { HttpError } from "@/lib/httpError"
import { serializeDocument } from "@/lib/serializeDocument"
import { CompanyDetailResponse } from "@/types/company.types"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface CompanyPageProps {
  params: Promise<{ id: string }>
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params
  const t = await getTranslations("CompanyPage")
  const locale = await getLocale()

  await connectDB()

  let data: CompanyDetailResponse
  try {
    const result = await companiesService.getCompanyById(id)
    data = serializeDocument(result)
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return notFound()
    }
    throw error
  }

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
