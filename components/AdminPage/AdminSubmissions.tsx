"use client"

import { adminService } from "@/services/admin.service"
import { ContactSubmission, ContactSubmissionStatus } from "@/types/cms.types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

const statusStyles: Record<ContactSubmissionStatus, string> = {
  new: "bg-[rgba(59,130,246,0.12)] text-[#60A5FA]",
  read: "bg-[rgba(234,179,8,0.12)] text-[#FACC15]",
  archived: "bg-[rgba(113,113,122,0.12)] text-[#A1A1AA]",
}

export default function AdminSubmissions() {
  const t = useTranslations("AdminPage.submissions")
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionId, setActionId] = useState<string | null>(null)

  const loadSubmissions = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminService.getSubmissions()
      setSubmissions(data)
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("load-error")))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await adminService.getSubmissions()
        if (cancelled) return
        setSubmissions(data)
      } catch (error) {
        if (cancelled) return
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

  const updateStatus = async (id: string, status: ContactSubmissionStatus) => {
    setActionId(id)
    try {
      const response = await adminService.updateSubmissionStatus(id, status)
      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: response.submission.status } : item
        )
      )
      toast.success(response.message || t("updated"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("update-error")))
    } finally {
      setActionId(null)
    }
  }

  if (isLoading) {
    return (
      <section className="flex min-h-[240px] items-center justify-center rounded-[20px] border border-[#27272A] bg-[#18181B]">
        <Loader2 className="size-8 animate-spin text-[#D0BCFF]" />
      </section>
    )
  }

  if (submissions.length === 0) {
    return (
      <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <p className="text-sm text-[#A1A1AA]">{t("empty")}</p>
      </section>
    )
  }

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
        <button type="button" onClick={() => void loadSubmissions()} className="base-btn btn-secondary px-4 py-2 text-sm">
          {t("refresh")}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {submissions.map((submission) => (
          <article key={submission._id} className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[#fafafa]">{submission.subject}</h3>
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold capitalize", statusStyles[submission.status])}>
                {t(`status.${submission.status}`)}
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA]">
              {submission.name} · {submission.email}
            </p>
            <p className="mt-1 text-xs text-[#71717A]">
              {format(new Date(submission.createdAt), "PPpp")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#CBC3D7]">{submission.message}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {submission.status !== "read" && (
                <button type="button" disabled={actionId === submission._id} onClick={() => void updateStatus(submission._id, "read")} className="base-btn btn-secondary px-3 py-2 text-xs disabled:opacity-50">
                  {t("mark-read")}
                </button>
              )}
              {submission.status !== "archived" && (
                <button type="button" disabled={actionId === submission._id} onClick={() => void updateStatus(submission._id, "archived")} className="base-btn btn-secondary px-3 py-2 text-xs disabled:opacity-50">
                  {t("archive")}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
