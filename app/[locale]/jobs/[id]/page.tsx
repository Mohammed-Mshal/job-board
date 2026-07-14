import {
  JobAboutSection,
  JobDetailsSections,
  JobHeader,
  JobSidebar,
  JobStatsGrid,
} from "@/components/JobPage"
import { savedJobsService } from "@/features/saved-jobs/saved-jobs.services"
import { applicationsServices } from "@/features/applications/applications.services"
import { jobsService } from "@/features/jobs/jobs.services"
import connectDB from "@/lib/db"
import { HttpError } from "@/lib/httpError"
import { serializeDocument } from "@/lib/serializeDocument"
import JobPostingJsonLd from "@/components/seo/JobPostingJsonLd"
import { buildPageMetadata } from "@/lib/seo"
import { IJob } from "@/types/job.types"
import type { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface JobPageProps {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { id, locale } = await params
  const t = await getTranslations("SEO")

  await connectDB()

  try {
    const result = await jobsService.getJobById(id)
    const job = serializeDocument(result) as IJob

    return buildPageMetadata({
      locale,
      path: `/jobs/${id}`,
      title: t("job-title", {
        title: job.title,
        company: job.company?.name ?? "Company",
      }),
      description: t("job-description", {
        title: job.title,
        location: job.location,
      }),
    })
  } catch {
    return {}
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params
  const t = await getTranslations("JobPage")
  const locale = await getLocale()

  await connectDB()

  let job: IJob
  try {
    const result = await jobsService.getJobById(id)
    job = serializeDocument(result) as IJob
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return notFound()
    }
    throw error
  }

  const [saveStatus, applicationStatus] = await Promise.all([
    savedJobsService.getSaveStatus(id),
    applicationsServices.getApplicationStatus(id),
  ])

  const jobTypeLabel = job.jobType ? t(job.jobType) : "--"
  const salaryLabel = job.salary?.salaryPeriod
    ? job.salary.salaryPeriod === "year"
      ? t("yearly")
      : t("monthly")
    : undefined
  const postedDate = job.createdAt
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(job.createdAt))
    : "--"

  return (
    <>
      <JobPostingJsonLd job={job} locale={locale} />
      <div className="container xl:max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        <main className="xl:col-span-9 col-span-12 flex flex-col gap-8">
          <JobHeader job={job} salaryLabel={salaryLabel} />
          <JobStatsGrid
            job={job}
            labels={{
              experience: t("experience"),
              years: t("years"),
              jobType: t("jobType"),
              teamSize: t("teamSize"),
              people: t("people"),
              posted: t("posted"),
            }}
            jobTypeLabel={jobTypeLabel}
            postedDate={postedDate}
          />
          <JobAboutSection
            job={job}
            labels={{
              aboutTheRole: t("about-the-role"),
              coreResponsibilities: t("core-responsibilities"),
              qualificationsRequired: t("qualifications-required"),
            }}
          />
          <JobDetailsSections
            job={job}
            labels={{
              requiredTechStack: t("required-tech-stack"),
              benefits: t("benefits"),
              hiringProcess: t("hiring-process"),
              faq: t("faq"),
            }}
          />
        </main>

        <JobSidebar
          job={job}
          isAuthenticated={saveStatus.isAuthenticated}
          isSaved={saveStatus.saved}
          hasApplied={applicationStatus.applied}
          labels={{
            apply: t("apply"),
            save: t("save"),
            quickInformation: t("quick-information"),
            jobType: t("jobType"),
            relocation: t("relocation"),
            visaSponsored: t("visa-sponsored"),
            yes: t("yes"),
            no: t("no"),
            supported: t("supported"),
            notSupported: t("not-supported"),
          }}
          jobTypeLabel={jobTypeLabel}
        />
      </div>
    </div>
    </>
  )
}
