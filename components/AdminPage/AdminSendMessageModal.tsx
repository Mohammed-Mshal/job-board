"use client"

import { adminService } from "@/services/admin.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminSendMessageModalProps {
  open: boolean
  userId: string
  userName: string
  onClose: () => void
  onSuccess?: () => void
}

interface MessageFormValues {
  subject: string
  message: string
}

export default function AdminSendMessageModal({
  open,
  userId,
  userName,
  onClose,
  onSuccess,
}: AdminSendMessageModalProps) {
  const t = useTranslations("AdminPage.userMessages")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormValues>({
    defaultValues: { subject: "", message: "" },
  })

  if (!open) return null

  const handleClose = () => {
    if (isSubmitting) return
    reset()
    onClose()
  }

  const onSubmit = async (data: MessageFormValues) => {
    try {
      const response = await adminService.sendUserMessage({
        userId,
        subject: data.subject,
        message: data.message,
      })
      toast.success(response.message || t("sent"))
      reset()
      onSuccess?.()
      onClose()
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("send-error")))
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
        aria-label={t("title")}
        className="relative z-10 w-full max-w-lg rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#fafafa]">{t("title")}</h3>
            <p className="mt-1 text-sm text-[#71717A]">{t("send-to", { name: userName })}</p>
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

        <form
          onSubmit={(event) => {
            event.preventDefault()
            void handleSubmit(onSubmit)(event)
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="message-subject" className="text-[#A1A1AA]">
              {t("subject")}
            </Label>
            <Input
              id="message-subject"
              className="border-[#27272A] bg-[#111113] text-[#fafafa]"
              disabled={isSubmitting}
              {...register("subject", {
                required: t("subject-required"),
                minLength: { value: 2, message: t("subject-min") },
              })}
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message-body" className="text-[#A1A1AA]">
              {t("message")}
            </Label>
            <textarea
              id="message-body"
              rows={5}
              disabled={isSubmitting}
              placeholder={t("message-placeholder")}
              className="w-full resize-none rounded-lg border border-[#27272A] bg-[#111113] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF] disabled:opacity-60"
              {...register("message", {
                required: t("message-required"),
                minLength: { value: 5, message: t("message-min") },
                maxLength: { value: 2000, message: t("message-max") },
              })}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border-[#27272A] bg-transparent text-[#A1A1AA] hover:bg-[#27272A]"
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-lg btn-primary">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  {t("sending")}
                </span>
              ) : (
                t("send")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
