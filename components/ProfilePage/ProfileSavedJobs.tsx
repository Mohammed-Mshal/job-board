"use client"

import JobCard from "@/components/JobCard/JobCard"
import { userService } from "@/services/user.service"
import { IJob } from "@/types/job.types"
import { Loader2 } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "./profile.utils"

export default function ProfileSavedJobs() {
  const t = useTranslations("ProfilePage.saved")
  const [jobs, setJobs] = useState<IJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const loadSavedJobs = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const data = await userService.getSavedJobs()
      setJobs(data.jobs as IJob[])
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
        const data = await userService.getSavedJobs()
        if (cancelled) return
        setJobs(data.jobs as IJob[])
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

  const handleSaveChange = (jobId: string, saved: boolean) => {
    if (!saved) {
      setJobs((prev) => prev.filter((job) => job.jobId !== jobId))
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
          onClick={() => void loadSavedJobs()}
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
      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <JobCard
            key={job.jobId}
            job={job}
            initialSaved
            onSaveChange={handleSaveChange}
          />
        ))}
      </div>
    </section>
  )
}
