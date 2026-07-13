"use client"

import { applicationService } from "@/services/application.service"
import { jobService } from "@/services/job.service"
import { Application } from "@/types/api.types"
import { ApplicationStatus } from "@/types/applications.types"
import { IJob } from "@/types/job.types"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
  Trash2,
} from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import {
  getApiErrorMessage,
  getStatusStyle,
  normalizeApplications,
} from "./profile.utils"

const statusStyles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.PENDING]: "bg-[rgba(234,179,8,0.12)] text-[#FACC15]",
  [ApplicationStatus.REVIEWING]: "bg-[rgba(59,130,246,0.12)] text-[#60A5FA]",
  [ApplicationStatus.ACCEPTED]: "bg-[rgba(34,197,94,0.12)] text-[#4ADE80]",
  [ApplicationStatus.REJECTED]: "bg-[rgba(248,113,113,0.12)] text-[#F87171]",
}

type ApplicantsLoadState = "idle" | "loading" | "loaded" | "error"

export default function ProfileCompanyJobs() {
  const t = useTranslations("ProfilePage.jobs")
  const [jobs, setJobs] = useState<IJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)
  const [applicants, setApplicants] = useState<Record<string, Application[]>>({})
  const [applicantStates, setApplicantStates] = useState<
    Record<string, ApplicantsLoadState>
  >({})
  const [actionId, setActionId] = useState<string | null>(null)
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null)

  const loadJobs = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const data = await jobService.getJobs({ mine: true, limit: 50 })
      setJobs(data.jobs)
    } catch (error) {
      setHasError(true)
      toast.error(getApiErrorMessage(error, t("load-error")))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await jobService.getJobs({ mine: true, limit: 50 })
        if (cancelled) return
        setJobs(data.jobs)
        setHasError(false)
      } catch (error) {
        if (cancelled) return
        setHasError(true)
        toast.error(getApiErrorMessage(error, t("load-error")))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [t])

  const loadApplicants = async (jobId: string) => {
    setApplicantStates((prev) => ({ ...prev, [jobId]: "loading" }))
    try {
      const data = await applicationService.getApplicationsByJob(jobId)
      setApplicants((prev) => ({
        ...prev,
        [jobId]: normalizeApplications(data),
      }))
      setApplicantStates((prev) => ({ ...prev, [jobId]: "loaded" }))
    } catch (error) {
      setApplicantStates((prev) => ({ ...prev, [jobId]: "error" }))
      toast.error(getApiErrorMessage(error, t("applicants-load-error")))
    }
  }

  const toggleApplicants = async (jobId: string) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null)
      return
    }

    setExpandedJobId(jobId)

    if (applicantStates[jobId] === "loaded") return

    await loadApplicants(jobId)
  }

  const handleStatusUpdate = async (
    applicationId: string,
    jobId: string,
    action: "accept" | "reject"
  ) => {
    setActionId(applicationId)
    try {
      const response =
        action === "accept"
          ? await applicationService.acceptApplication(applicationId)
          : await applicationService.rejectApplication(applicationId)

      const updated = response.application
      setApplicants((prev) => ({
        ...prev,
        [jobId]:
          prev[jobId]?.map((app) =>
            app._id === applicationId ? { ...app, status: updated.status } : app
          ) ?? [],
      }))
      toast.success(response.message || t("status-updated"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("status-error")))
    } finally {
      setActionId(null)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    setDeletingJobId(jobId)
    try {
      const response = await jobService.deleteJob(jobId)
      setJobs((prev) => prev.filter((job) => job.jobId !== jobId))
      setApplicants((prev) => {
        const next = { ...prev }
        delete next[jobId]
        return next
      })
      setApplicantStates((prev) => {
        const next = { ...prev }
        delete next[jobId]
        return next
      })
      if (expandedJobId === jobId) {
        setExpandedJobId(null)
      }
      toast.success(response.message || t("delete-success"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("delete-error")))
    } finally {
      setDeletingJobId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="flex min-h-[240px] items-center justify-center rounded-[20px] border border-[#27272A] bg-[#18181B]">
        <Loader2 className="size-8 animate-spin text-[#D0BCFF]" />
      </section>
    )
  }

  if (hasError) {
    return (
      <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <p className="mb-6 text-sm text-[#A1A1AA]">{t("load-error")}</p>
        <button
          type="button"
          onClick={() => void loadJobs()}
          className="base-btn btn-primary inline-flex px-6"
        >
          {t("retry")}
        </button>
      </section>
    )
  }

  if (jobs.length === 0) {
    return (
      <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <p className="text-sm text-[#A1A1AA]">{t("empty")}</p>
      </section>
    )
  }

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => {
          const applicantState = applicantStates[job.jobId] ?? "idle"
          const jobApplicants = applicants[job.jobId] ?? []

          return (
            <article
              key={job.jobId}
              className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-[#fafafa]">
                      {job.title}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold capitalize",
                        job.status === "open"
                          ? "bg-[rgba(34,197,94,0.12)] text-[#4ADE80]"
                          : "bg-[rgba(248,113,113,0.12)] text-[#F87171]"
                      )}
                    >
                      {t(`status.${job.status}`)}
                    </span>
                  </div>
                  <p className="text-sm text-[#A1A1AA]">{job.location}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/jobs/${job.jobId}`}
                    className="base-btn btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <ExternalLink className="size-4" />
                    {t("view")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void toggleApplicants(job.jobId)}
                    className="base-btn btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    {expandedJobId === job.jobId ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                    {t("applicants")}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDeleteJob(job.jobId)}
                    disabled={deletingJobId === job.jobId}
                    className="base-btn flex items-center gap-2 border border-[rgba(248,113,113,0.3)] bg-transparent px-4 py-2 text-sm text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] disabled:opacity-50"
                  >
                    {deletingJobId === job.jobId ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    {t("delete")}
                  </button>
                </div>
              </div>

              {expandedJobId === job.jobId && (
                <div className="mt-4 border-t border-[#27272A] pt-4">
                  {applicantState === "loading" ? (
                    <div className="flex justify-center py-6">
                      <Loader2 className="size-6 animate-spin text-[#D0BCFF]" />
                    </div>
                  ) : applicantState === "error" ? (
                    <div className="py-4 text-center">
                      <p className="mb-4 text-sm text-[#A1A1AA]">
                        {t("applicants-load-error")}
                      </p>
                      <button
                        type="button"
                        onClick={() => void loadApplicants(job.jobId)}
                        className="base-btn btn-secondary px-4 py-2 text-sm"
                      >
                        {t("retry")}
                      </button>
                    </div>
                  ) : jobApplicants.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {jobApplicants.map((application) => (
                        <div
                          key={application._id}
                          className="rounded-lg border border-[#27272A] bg-[#18181B] p-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-medium text-[#fafafa]">
                                {application.user?.name}
                              </p>
                              <p className="text-sm text-[#A1A1AA]">
                                {application.user?.email}
                              </p>
                              <span
                                className={cn(
                                  "mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold capitalize",
                                  getStatusStyle(application.status, statusStyles)
                                )}
                              >
                                {t(`application-status.${application.status}`)}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {application.resume?.url && (
                                <a
                                  href={application.resume.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="base-btn btn-secondary px-3 py-2 text-xs"
                                >
                                  {t("view-resume")}
                                </a>
                              )}
                              {application.status !== ApplicationStatus.ACCEPTED && (
                                <button
                                  type="button"
                                  disabled={actionId === application._id}
                                  onClick={() =>
                                    void handleStatusUpdate(
                                      application._id,
                                      job.jobId,
                                      "accept"
                                    )
                                  }
                                  className="base-btn btn-primary px-3 py-2 text-xs disabled:opacity-50"
                                >
                                  {t("accept")}
                                </button>
                              )}
                              {application.status !== ApplicationStatus.REJECTED && (
                                <button
                                  type="button"
                                  disabled={actionId === application._id}
                                  onClick={() =>
                                    void handleStatusUpdate(
                                      application._id,
                                      job.jobId,
                                      "reject"
                                    )
                                  }
                                  className="base-btn flex border border-[rgba(248,113,113,0.3)] bg-transparent px-3 py-2 text-xs text-[#F87171] disabled:opacity-50"
                                >
                                  {t("reject")}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-4 text-center text-sm text-[#A1A1AA]">
                      {t("no-applicants")}
                    </p>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
