"use client"

import { contactService } from "@/services/contact.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AxiosError } from "axios"

interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const t = useTranslations("ContactPage.form")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await contactService.submitContact(data)
      toast.success(response.message || t("success"))
      reset()
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

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8">
      <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(onSubmit)(event)
        }}
        className="flex flex-col gap-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-[#A1A1AA]">
              {t("name")}
            </Label>
            <Input
              id="name"
              placeholder={t("name-placeholder")}
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
            <Label htmlFor="email" className="text-[#A1A1AA]">
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("email-placeholder")}
              className="border-[#27272A] bg-[#111113] text-[#fafafa]"
              disabled={isSubmitting}
              {...register("email", {
                required: t("email-required"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("email-invalid"),
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subject" className="text-[#A1A1AA]">
            {t("subject")}
          </Label>
          <Input
            id="subject"
            placeholder={t("subject-placeholder")}
            className="border-[#27272A] bg-[#111113] text-[#fafafa]"
            disabled={isSubmitting}
            {...register("subject", {
              required: t("subject-required"),
              minLength: { value: 3, message: t("subject-min") },
            })}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-[#A1A1AA]">
            {t("message")}
          </Label>
          <textarea
            id="message"
            rows={6}
            placeholder={t("message-placeholder")}
            disabled={isSubmitting}
            className="w-full resize-none rounded-lg border border-[#27272A] bg-[#111113] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF] disabled:opacity-60"
            {...register("message", {
              required: t("message-required"),
              minLength: { value: 10, message: t("message-min") },
              maxLength: { value: 2000, message: t("message-max") },
            })}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg btn-primary md:w-auto md:self-start"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {t("sending")}
            </span>
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </section>
  )
}
