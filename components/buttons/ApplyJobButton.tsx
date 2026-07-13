"use client"

import { applicationService } from "@/services/application.service"
import { useAuthStore } from "@/store/auth.store"
import { USER_ROLES } from "@/constants/roles"
import { USER_STATUS } from "@/constants/userStatus"
import { CheckCircle2, FileText, FileCheck, Loader2, Upload, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AxiosError } from "axios"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MAX_RESUME_SIZE = 5 * 1024 * 1024
const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

interface ApplyJobFormValues {
  coverLetter: string
}

interface ApplyJobButtonProps {
  jobId: string
  initialApplied?: boolean
  isAuthenticated?: boolean
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ApplyJobButton({
  jobId,
  initialApplied = false,
  isAuthenticated: isAuthenticatedServer = false,
}: ApplyJobButtonProps) {
  const t = useTranslations("JobPage")
  const router = useRouter()
  const isAuthenticatedClient = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = isAuthenticatedServer || isAuthenticatedClient
  const [open, setOpen] = useState(false)
  const [applied, setApplied] = useState(initialApplied)
  const [isApplying, setIsApplying] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyJobFormValues>()

  const canApply =
    isAuthenticated &&
    user?.role === USER_ROLES.USER &&
    (user?.status ?? USER_STATUS.ACTIVE) === USER_STATUS.ACTIVE
  const isSuspended =
    isAuthenticated &&
    user?.role === USER_ROLES.USER &&
    user?.status === USER_STATUS.SUSPENDED
  const hasApplied = isAuthenticated && applied

  useEffect(() => {
    if (!isAuthenticated) return

    let cancelled = false

    applicationService
      .getApplicationStatus(jobId)
      .then((status) => {
        if (!cancelled && status.isAuthenticated) {
          setApplied(status.applied)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [jobId, isAuthenticated])

  const resetModal = () => {
    setOpen(false)
    reset()
    setSelectedFile(null)
    setFileError(null)
    setUploadProgress(0)
    setFileInputKey((key) => key + 1)
  }

  const handleOpen = () => {
    if (hasApplied) return

    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/jobs/${jobId}`)
      return
    }

    if (user?.role === USER_ROLES.COMPANY) {
      toast.error(t("company-cannot-apply"))
      return
    }

    if (user?.status === USER_STATUS.SUSPENDED) {
      toast.error(t("account-suspended"))
      return
    }

    setOpen(true)
  }

  const handleClose = () => {
    if (isApplying) return
    resetModal()
  }

  const validateResumeFile = (file: File) => {
    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      return t("resume-invalid-type")
    }
    if (file.size > MAX_RESUME_SIZE) {
      return t("resume-too-large")
    }
    return null
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileError(null)

    if (!file) {
      setSelectedFile(null)
      return
    }

    const validationError = validateResumeFile(file)
    if (validationError) {
      setSelectedFile(null)
      setFileError(validationError)
      setFileInputKey((key) => key + 1)
      return
    }

    setSelectedFile(file)
  }

  const onSubmit = async (data: ApplyJobFormValues) => {
    if (!selectedFile) {
      setFileError(t("resume-required"))
      return
    }

    setIsApplying(true)
    setUploadProgress(0)

    try {
      const response = await applicationService.applyToJob(
        {
          jobId,
          coverLetter: data.coverLetter,
          resume: selectedFile,
        },
        {
          onUploadProgress: (progress) => {
            setUploadProgress(progress)
          },
        }
      )

      setUploadProgress(100)
      setApplied(true)
      resetModal()
      toast.success(response.message || t("apply-success"))
    } catch (error) {
      setUploadProgress(0)

      if (error instanceof AxiosError && error.response?.status === 403) {
        const data = error.response?.data as { error?: string; code?: string }
        if (data?.code === "accountSuspended") {
          toast.error(t("account-suspended"))
          return
        }
        toast.error(data?.error ?? t("apply-error"))
        return
      }

      if (error instanceof AxiosError && error.response?.status === 400) {
        const message = (error.response?.data?.error as string) ?? t("apply-error")
        if (message.toLowerCase().includes("already applied")) {
          setApplied(true)
          resetModal()
          toast.error(t("already-applied"))
          return
        }
        toast.error(message)
        return
      }

      const message =
        error instanceof AxiosError
          ? ((error.response?.data?.error as string) ?? t("apply-error"))
          : t("apply-error")
      toast.error(message)
    } finally {
      setIsApplying(false)
    }
  }

  if (isSuspended) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="base-btn px-4 py-2.5 rounded-lg w-full flex items-center justify-center gap-2 cursor-not-allowed bg-[#27272A] border border-[#F87171] text-[#F87171] opacity-100"
      >
        <FileText size={16} />
        {t("account-suspended")}
      </button>
    )
  }

  if (hasApplied) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="base-btn px-4 py-2.5 rounded-lg w-full flex items-center justify-center gap-2 cursor-not-allowed bg-[#27272A] border border-[#22C55E] text-[#22C55E] opacity-100"
      >
        <CheckCircle2 size={16} />
        {t("applied")}
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="base-btn btn-primary px-4 py-2.5 rounded-lg w-full flex items-center justify-center gap-2 cursor-pointer"
      >
        <FileText size={16} />
        {t("apply")}
      </button>

      {open && canApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("apply-modal-title")}
            className="relative z-10 w-full max-w-lg rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#fafafa]">
                {t("apply-modal-title")}
              </h3>
              <button
                type="button"
                onClick={handleClose}
                disabled={isApplying}
                className="rounded-lg p-2 text-[#A1A1AA] transition-colors hover:bg-[#27272A] hover:text-[#fafafa] disabled:opacity-50"
                aria-label={t("close")}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                void handleSubmit(onSubmit)(event)
              }}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="coverLetter" className="text-[#A1A1AA]">
                  {t("cover-letter")}
                </Label>
                <textarea
                  id="coverLetter"
                  rows={5}
                  disabled={isApplying}
                  placeholder={t("cover-letter-placeholder")}
                  className="w-full resize-none rounded-lg border border-[#27272A] bg-[#111113] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF] disabled:opacity-60"
                  {...register("coverLetter", {
                    required: t("cover-letter-required"),
                    minLength: {
                      value: 20,
                      message: t("cover-letter-min"),
                    },
                  })}
                />
                {errors.coverLetter && (
                  <p className="text-sm text-red-500">
                    {errors.coverLetter.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="resume" className="text-[#A1A1AA]">
                  {t("resume")}
                </Label>

                <label
                  htmlFor="resume"
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-[#111113] px-4 py-6 text-center transition-colors",
                    selectedFile
                      ? "border-[#D0BCFF]"
                      : "border-[#494454] hover:border-[#D0BCFF]",
                    isApplying && "pointer-events-none opacity-60"
                  )}
                >
                  {selectedFile ? (
                    <>
                      <FileCheck size={20} className="text-[#D0BCFF]" />
                      <span className="text-sm font-medium text-[#fafafa]">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-[#71717A]">
                        {formatFileSize(selectedFile.size)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="text-[#D0BCFF]" />
                      <span className="text-sm text-[#A1A1AA]">
                        {t("resume-placeholder")}
                      </span>
                    </>
                  )}
                  <input
                    key={fileInputKey}
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="sr-only"
                    disabled={isApplying}
                    onChange={handleFileChange}
                  />
                </label>

                {fileError && (
                  <p className="text-sm text-red-500">{fileError}</p>
                )}

                {isApplying && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                      <span>{t("uploading-resume")}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div
                      className="h-2 w-full overflow-hidden rounded-full bg-[#27272A]"
                      role="progressbar"
                      aria-valuenow={uploadProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={t("uploading-resume")}
                    >
                      <div
                        className="h-full rounded-full bg-[#D0BCFF] transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isApplying}
                  className="flex-1 rounded-lg border-[#27272A] bg-transparent text-[#A1A1AA] hover:bg-[#27272A]"
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isApplying || !selectedFile}
                  className="flex-1 rounded-lg btn-primary"
                >
                  {isApplying ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      {uploadProgress > 0
                        ? t("uploading-percent", { percent: uploadProgress })
                        : t("submit-application")}
                    </span>
                  ) : (
                    t("submit-application")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
