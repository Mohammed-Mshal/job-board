"use client"

import { changePasswordSchema } from "@/features/user/user.validation"
import { userService } from "@/services/user.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ChangePasswordValues = z.infer<typeof changePasswordSchema>

export default function ProfilePasswordForm() {
  const t = useTranslations("ProfilePage.security")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
  })

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      const response = await userService.changePassword(data)
      reset()
      toast.success(response.message || t("success"))
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
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <h2 className="mb-2 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
      <p className="mb-6 text-sm text-[#A1A1AA]">{t("description")}</p>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(onSubmit)(event)
        }}
        className="flex max-w-lg flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="currentPassword">{t("current-password")}</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register("password")}
            className="bg-[#0f0f11] border-[#27272A]"
          />
          {errors.password && (
            <p className="text-sm text-[#F87171]">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="newPassword">{t("new-password")}</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            className="bg-[#0f0f11] border-[#27272A]"
          />
          {errors.newPassword && (
            <p className="text-sm text-[#F87171]">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">{t("confirm-password")}</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("newPasswordConfirmation")}
            className="bg-[#0f0f11] border-[#27272A]"
          />
          {errors.newPasswordConfirmation && (
            <p className="text-sm text-[#F87171]">
              {errors.newPasswordConfirmation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="base-btn btn-primary mt-2 flex items-center justify-center gap-2 self-start px-8"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? t("saving") : t("submit")}
        </button>
      </form>
    </section>
  )
}
