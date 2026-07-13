"use client"

import { adminService } from "@/services/admin.service"
import { ITestimonial, TestimonialStatus } from "@/types/testimonial.types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminTestimonialActionModalProps {
  open: boolean
  testimonial: ITestimonial | null
  action: TestimonialStatus | null
  onClose: () => void
  onSuccess: (testimonial: ITestimonial) => void
}

export default function AdminTestimonialActionModal({
  open,
  testimonial,
  action,
  onClose,
  onSuccess,
}: AdminTestimonialActionModalProps) {
  const t = useTranslations("AdminPage.testimonials")
  const [adminMessage, setAdminMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!open || !testimonial || !action) return null

  const isApprove = action === "approved"
  const hasUser = Boolean(testimonial.userId)

  const handleClose = () => {
    if (isSubmitting) return
    setAdminMessage("")
    onClose()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await adminService.updateTestimonialStatus(
        testimonial._id,
        action,
        adminMessage.trim() || undefined
      )
      toast.success(response.message || t("updated"))
      setAdminMessage("")
      onSuccess(response.testimonial)
      onClose()
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("update-error")))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isApprove ? t("approve") : t("reject")}
        className="relative z-10 w-full max-w-lg rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#fafafa]">
              {isApprove ? t("approve-title") : t("reject-title")}
            </h3>
            <p className="mt-1 text-sm text-[#71717A]">
              {testimonial.name} · {testimonial.jobTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-[#A1A1AA] transition-colors hover:bg-[#27272A] hover:text-[#fafafa] disabled:opacity-50"
            aria-label={t("close")}
          >
            <X size={18} />
          </button>
        </div>

        {hasUser ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="testimonial-admin-message" className="text-[#A1A1AA]">
              {t("admin-message-label")}
            </Label>
            <textarea
              id="testimonial-admin-message"
              rows={4}
              value={adminMessage}
              onChange={(event) => setAdminMessage(event.target.value)}
              disabled={isSubmitting}
              placeholder={t("admin-message-placeholder")}
              className="w-full resize-none rounded-lg border border-[#27272A] bg-[#111113] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF] disabled:opacity-60"
            />
            <p className="text-xs text-[#71717A]">{t("admin-message-hint")}</p>
          </div>
        ) : (
          <p className="text-sm text-[#A1A1AA]">{t("no-user-message")}</p>
        )}

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 rounded-lg border-[#27272A] bg-transparent text-[#A1A1AA] hover:bg-[#27272A]"
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
            className="flex-1 rounded-lg btn-primary"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                {t("saving")}
              </span>
            ) : isApprove ? (
              t("approve")
            ) : (
              t("reject")
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
