"use client"

import { applicationService } from "@/services/application.service"
import { Application } from "@/types/api.types"
import { ApplicationStatus } from "@/types/applications.types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { ExternalLink, Loader2, Trash2 } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
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

export default function ProfileApplications() {
  const t = useTranslations("ProfilePage.applications")
  const locale = useLocale()
  const dateLocale = locale === "ar" ? ar : enUS
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadApplications = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const data = await applicationService.getApplications()
      setApplications(normalizeApplications(data))
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
        const data = await applicationService.getApplications()
        if (cancelled) return
        setApplications(normalizeApplications(data))
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

  const handleWithdraw = async (id: string) => {
    setDeletingId(id)
    try {
      const response = await applicationService.deleteApplication(id)
      setApplications((prev) => prev.filter((app) => app._id !== id))
      toast.success(response.message || t("withdraw-success"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("withdraw-error")))
    } finally {
      setDeletingId(null)
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
          onClick={() => void loadApplications()}
          className="base-btn btn-primary inline-flex px-6"
        >
          {t("retry")}
        </button>
      </section>
    )
  }

  if (applications.length === 0) {
    return (
      <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <p className="mb-6 text-sm text-[#A1A1AA]">{t("empty")}</p>
        <Link href="/jobs" className="base-btn btn-primary inline-flex px-6">
          {t("browse-jobs")}
        </Link>
      </section>
    )
  }

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>

      <div className="flex flex-col gap-4">
        {applications.map((application) => (
          <article
            key={application._id}
            className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-[#fafafa]">
                    {application.job?.title ?? t("unknown-job")}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold capitalize",
                      getStatusStyle(application.status, statusStyles)
                    )}
                  >
                    {t(`status.${application.status}`)}
                  </span>
                </div>
                <p className="text-sm text-[#A1A1AA]">
                  {application.job?.company?.name}
                </p>
                <p className="text-xs text-[#71717A]">
                  {t("applied-on")}{" "}
                  {format(new Date(application.createdAt), "PPP", {
                    locale: dateLocale,
                  })}
                </p>
              </div>

              <div className="relative z-20 flex flex-wrap items-center gap-2">
                {application.job?.jobId && (
                  <Link
                    href={`/jobs/${application.job.jobId}`}
                    className="base-btn btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <ExternalLink className="size-4" />
                    {t("view-job")}
                  </Link>
                )}
                {application.resume?.url && (
                  <a
                    href={application.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="base-btn btn-secondary px-4 py-2 text-sm"
                  >
                    {t("view-resume")}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => void handleWithdraw(application._id)}
                  disabled={deletingId === application._id}
                  className="base-btn flex items-center gap-2 border border-[rgba(248,113,113,0.3)] bg-transparent px-4 py-2 text-sm text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] disabled:opacity-50"
                >
                  {deletingId === application._id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  {t("withdraw")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
