"use client"

import { USER_ROLES } from "@/constants/roles"
import { PublicUser } from "@/types/api.types"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { Building2, Mail, MapPin, User } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import ProfileAvatar from "./ProfileAvatar"

interface ProfileOverviewProps {
  user: PublicUser
  onUpdated: () => void
}

export default function ProfileOverview({ user, onUpdated }: ProfileOverviewProps) {
  const t = useTranslations("ProfilePage.overview")
  const locale = useLocale()
  const dateLocale = locale === "ar" ? ar : enUS

  const roleLabel =
    user.role === USER_ROLES.COMPANY ? t("role-company") : t("role-user")

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <ProfileAvatar user={user} onUpdated={onUpdated} />

        <div className="flex flex-1 flex-col gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-[#fafafa]">{user.name}</h2>
              <span className="rounded-full bg-[rgba(208,188,255,0.1)] px-3 py-1 text-xs font-bold text-[#D0BCFF]">
                {roleLabel}
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA]">{user.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3">
              <Mail className="size-4 shrink-0 text-[#D0BCFF]" />
              <div>
                <p className="text-xs text-[#71717A]">{t("email")}</p>
                <p className="text-sm font-medium text-[#fafafa]">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3">
              <MapPin className="size-4 shrink-0 text-[#D0BCFF]" />
              <div>
                <p className="text-xs text-[#71717A]">{t("location")}</p>
                <p className="text-sm font-medium text-[#fafafa]">{user.location}</p>
              </div>
            </div>

            {user.role === USER_ROLES.COMPANY && user.teamSize && (
              <div className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3">
                <Building2 className="size-4 shrink-0 text-[#D0BCFF]" />
                <div>
                  <p className="text-xs text-[#71717A]">{t("team-size")}</p>
                  <p className="text-sm font-medium text-[#fafafa]">
                    {user.teamSize.min} – {user.teamSize.max} {t("people")}
                  </p>
                </div>
              </div>
            )}

            {user.role === USER_ROLES.USER && (
              <div className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3">
                <User className="size-4 shrink-0 text-[#D0BCFF]" />
                <div>
                  <p className="text-xs text-[#71717A]">{t("saved-jobs")}</p>
                  <p className="text-sm font-medium text-[#fafafa]">
                    {user.savedJobs?.length ?? 0}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3">
              <div>
                <p className="text-xs text-[#71717A]">{t("member-since")}</p>
                <p className="text-sm font-medium text-[#fafafa]">
                  {format(new Date(user.createdAt), "MMMM yyyy", {
                    locale: dateLocale,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
