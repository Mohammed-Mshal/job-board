"use client"

import { testimonialService } from "@/services/testimonial.service"
import { getUserAvatarUrl } from "@/lib/getUserAvatarUrl"
import { PublicUser } from "@/types/api.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Loader2, Star, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AxiosError } from "axios"
import { useRouter } from "@/i18n/navigation"

interface AddTestimonialModalProps {
  user: PublicUser
  onClose: () => void
  onSuccess: () => void
}

interface TestimonialFormValues {
  name: string
  jobTitle: string
  testimonial: string
}

export default function AddTestimonialModal({
  user,
  onClose,
  onSuccess,
}: AddTestimonialModalProps) {
  const t = useTranslations("TestimonialsSection.form")
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormValues>({
    defaultValues: {
      name: user.name,
      jobTitle: "",
      testimonial: "",
    },
  })

  const handleClose = () => {
    if (isSubmitting) return
    onClose()
  }

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      const response = await testimonialService.submit({
        name: data.name,
        jobTitle: data.jobTitle,
        testimonial: data.testimonial,
        rating,
      })
      toast.success(response.message || t("success"))
      onSuccess()
      onClose()
      router.refresh()
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? ((error.response?.data?.error as string) ??
            (error.response?.data?.errors
              ? Object.values(error.response.data.errors as Record<string, string[]>)
                  .flat()
                  .join(", ")
              : t("error")))
          : t("error")
      toast.error(message)
    }
  }

  const avatarUrl = getUserAvatarUrl(user.name, user.profileImage?.url)
  const hasProfileImage = Boolean(user.profileImage?.url)

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
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#fafafa]">{t("title")}</h3>
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

        <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#27272A] bg-[#0f0f11] p-4">
          <div className="size-14 shrink-0 overflow-hidden rounded-full border border-[#27272A] bg-[#27272A]">
            {hasProfileImage ? (
              <Image
                src={avatarUrl}
                alt={user.name}
                width={56}
                height={56}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-lg font-bold text-[#D0BCFF]">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-[#fafafa]">{user.name}</p>
            <p className="text-xs text-[#71717A]">
              {hasProfileImage ? t("using-profile-image") : t("using-default-image")}
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            void handleSubmit(onSubmit)(event)
          }}
          className="flex flex-col gap-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="testimonial-name" className="text-[#A1A1AA]">
                {t("name")}
              </Label>
              <Input
                id="testimonial-name"
                className="border-[#27272A] bg-[#111113] text-[#fafafa]"
                disabled={isSubmitting}
                {...register("name", {
                  required: t("name-required"),
                  minLength: { value: 2, message: t("name-min") },
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="testimonial-job-title" className="text-[#A1A1AA]">
                {t("job-title")}
              </Label>
              <Input
                id="testimonial-job-title"
                className="border-[#27272A] bg-[#111113] text-[#fafafa]"
                disabled={isSubmitting}
                {...register("jobTitle", {
                  required: t("job-title-required"),
                  minLength: { value: 2, message: t("job-title-min") },
                })}
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[#A1A1AA]">{t("rating")}</Label>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => {
                const value = index + 1
                const active = value <= (hoverRating || rating)
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={isSubmitting}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(value)}
                    className="rounded p-1 transition-colors hover:bg-[#27272A] disabled:opacity-50"
                    aria-label={t("rating-value", { value })}
                  >
                    <Star
                      className={cn(
                        "size-6",
                        active
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "text-[#494454]"
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="testimonial-review" className="text-[#A1A1AA]">
              {t("review")}
            </Label>
            <textarea
              id="testimonial-review"
              rows={5}
              disabled={isSubmitting}
              placeholder={t("review-placeholder")}
              className="w-full resize-none rounded-lg border border-[#27272A] bg-[#111113] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF] disabled:opacity-60"
              {...register("testimonial", {
                required: t("review-required"),
                minLength: { value: 20, message: t("review-min") },
                maxLength: { value: 1000, message: t("review-max") },
              })}
            />
            {errors.testimonial && (
              <p className="text-sm text-red-500">{errors.testimonial.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border-[#27272A] bg-transparent text-[#A1A1AA] hover:bg-[#27272A] py-3"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg btn-primary py-3"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  {t("submitting")}
                </span>
              ) : (
                t("submit")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
