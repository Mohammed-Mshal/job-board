"use client"

import { USER_ROLES } from "@/constants/roles"
import { updateProfileSchema } from "@/features/user/user.validation"
import { userService } from "@/services/user.service"
import { useAuthStore } from "@/store/auth.store"
import { PublicUser } from "@/types/api.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type EditProfileValues = z.infer<typeof updateProfileSchema>

interface ProfileEditFormProps {
  user: PublicUser
  onUpdated: () => void
}

export default function ProfileEditForm({ user, onUpdated }: ProfileEditFormProps) {
  const t = useTranslations("ProfilePage.edit")
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      description: user.description,
      location: user.location,
      password: "",
      teamSizeMin: user.teamSize?.min,
      teamSizeMax: user.teamSize?.max,
    },
  })

  useEffect(() => {
    reset({
      name: user.name,
      description: user.description,
      location: user.location,
      password: "",
      teamSizeMin: user.teamSize?.min,
      teamSizeMax: user.teamSize?.max,
    })
  }, [user, reset])

  const onSubmit = async (data: EditProfileValues) => {
    try {
      const response = await userService.updateProfile({
        name: data.name,
        description: data.description,
        location: data.location,
        password: data.password,
        teamSizeMin: data.teamSizeMin,
        teamSizeMax: data.teamSizeMax,
      })
      await fetchUser()
      onUpdated()
      reset({ ...data, password: "" })
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
      <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(onSubmit)(event)
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" {...register("name")} className="bg-[#0f0f11] border-[#27272A]" />
          {errors.name && (
            <p className="text-sm text-[#F87171]">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">{t("description")}</Label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className="min-h-[120px] w-full rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"
          />
          {errors.description && (
            <p className="text-sm text-[#F87171]">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="location">{t("location")}</Label>
          <Input
            id="location"
            {...register("location")}
            className="bg-[#0f0f11] border-[#27272A]"
          />
          {errors.location && (
            <p className="text-sm text-[#F87171]">{errors.location.message}</p>
          )}
        </div>

        {user.role === USER_ROLES.COMPANY && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="teamSizeMin">{t("team-size-min")}</Label>
              <Input
                id="teamSizeMin"
                type="number"
                min={1}
                {...register("teamSizeMin", { valueAsNumber: true })}
                className="bg-[#0f0f11] border-[#27272A]"
              />
              {errors.teamSizeMin && (
                <p className="text-sm text-[#F87171]">{errors.teamSizeMin.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="teamSizeMax">{t("team-size-max")}</Label>
              <Input
                id="teamSizeMax"
                type="number"
                min={1}
                {...register("teamSizeMax", { valueAsNumber: true })}
                className="bg-[#0f0f11] border-[#27272A]"
              />
              {errors.teamSizeMax && (
                <p className="text-sm text-[#F87171]">{errors.teamSizeMax.message}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{t("current-password")}</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className="bg-[#0f0f11] border-[#27272A]"
          />
          {errors.password && (
            <p className="text-sm text-[#F87171]">{errors.password.message}</p>
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
