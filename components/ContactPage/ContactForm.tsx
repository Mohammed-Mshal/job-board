"use client"

import { contactService } from "@/services/contact.service"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    <section className="surface-card">
      <h2 className="heading-section">{t("title")}</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(onSubmit)(event)
        }}
        className="form-stack"
      >
        <div className="form-grid">
          <div className="form-field">
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              placeholder={t("name-placeholder")}
              disabled={isSubmitting}
              {...register("name", {
                required: t("name-required"),
                minLength: { value: 2, message: t("name-min") },
              })}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          <div className="form-field">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("email-placeholder")}
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
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="form-field">
          <Label htmlFor="subject">{t("subject")}</Label>
          <Input
            id="subject"
            placeholder={t("subject-placeholder")}
            disabled={isSubmitting}
            {...register("subject", {
              required: t("subject-required"),
              minLength: { value: 3, message: t("subject-min") },
            })}
          />
          {errors.subject && (
            <p className="form-error">{errors.subject.message}</p>
          )}
        </div>

        <div className="form-field">
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder={t("message-placeholder")}
            disabled={isSubmitting}
            {...register("message", {
              required: t("message-required"),
              minLength: { value: 10, message: t("message-min") },
              maxLength: { value: 2000, message: t("message-max") },
            })}
          />
          {errors.message && (
            <p className="form-error">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="base-btn btn-primary w-full md:w-auto md:self-start"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              {t("sending")}
            </span>
          ) : (
            t("submit")
          )}
        </button>
      </form>
    </section>
  )
}
