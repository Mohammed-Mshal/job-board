"use client"

import { jobService } from "@/services/job.service"
import { useAuthStore } from "@/store/auth.store"
import { Archive, Bookmark, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { cn } from "@/lib/utils"

interface SaveJobButtonProps {
  jobId: string
  initialSaved?: boolean
  isAuthenticated?: boolean
  variant?: "default" | "icon"
  className?: string
  onSaveChange?: (jobId: string, saved: boolean) => void
}

export default function SaveJobButton({
  jobId,
  initialSaved = false,
  isAuthenticated: isAuthenticatedServer = false,
  variant = "default",
  className,
  onSaveChange,
}: SaveJobButtonProps) {
  const t = useTranslations("JobPage")
  const router = useRouter()
  const isAuthenticatedClient = useAuthStore((state) => state.isAuthenticated)
  const isAuthenticated = isAuthenticatedServer || isAuthenticatedClient
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return

    let cancelled = false

    jobService
      .getSaveStatus(jobId)
      .then((status) => {
        if (!cancelled && status.isAuthenticated) {
          setSaved(status.saved)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [jobId, isAuthenticated])

  const handleSave = async () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/jobs/${jobId}`)
      return
    }

    setLoading(true)
    try {
      const response = await jobService.toggleSaveJob(jobId)
      setSaved(response.saved)
      onSaveChange?.(jobId, response.saved)
      toast.success(response.saved ? t("job-saved") : t("job-unsaved"))
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? ((error.response?.data?.error as string) ?? t("save-error"))
          : t("save-error")
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    void handleSave()
  }

  const isBusy = loading

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isBusy}
        aria-pressed={saved}
        aria-label={saved ? t("saved") : t("save")}
        title={saved ? t("saved") : t("save")}
        className={cn(
          "relative z-20 flex size-12 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer",
          saved
            ? "bg-[#27272A] text-[#D0BCFF]"
            : "bg-[#27272A] text-[#71717A] hover:bg-[#3F3F46] hover:text-[#FFFFFF]",
          isBusy && "opacity-70",
          className
        )}
      >
        {isBusy ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Bookmark className={cn("size-6", saved && "fill-current")} />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isBusy}
      aria-pressed={saved}
      className={cn(
        "base-btn btn-secondary px-4 py-2.5 rounded-lg w-full cursor-pointer flex items-center justify-center gap-2 transition-colors",
        saved && "bg-[#27272A] border-[#D0BCFF] text-[#D0BCFF]",
        !saved && "hover:bg-[#27272A] hover:border-[#3F3F46]",
        className
      )}
    >
      {isBusy ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Archive size={16} className={saved ? "fill-current" : undefined} />
      )}
      {saved ? t("saved") : t("save")}
    </button>
  )
}
