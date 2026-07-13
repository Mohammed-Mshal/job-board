"use client"

import { USER_ROLES } from "@/constants/roles"
import { PublicUser } from "@/types/api.types"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Bookmark,
  FileText,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  Pencil,
} from "lucide-react"
import { useTranslations } from "next-intl"

export type ProfileTab =
  | "overview"
  | "edit"
  | "security"
  | "applications"
  | "saved"
  | "jobs"
  | "messages"

interface ProfileSidebarProps {
  user: PublicUser
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
  onLogout: () => void
  isLoggingOut: boolean
}

export default function ProfileSidebar({
  user,
  activeTab,
  onTabChange,
  onLogout,
  isLoggingOut,
}: ProfileSidebarProps) {
  const t = useTranslations("ProfilePage.tabs")

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode; roles?: string[] }[] = [
    { id: "overview", label: t("overview"), icon: <LayoutDashboard className="size-4" /> },
    { id: "edit", label: t("edit"), icon: <Pencil className="size-4" /> },
    { id: "security", label: t("security"), icon: <KeyRound className="size-4" /> },
    { id: "messages", label: t("messages"), icon: <Mail className="size-4" /> },
    {
      id: "applications",
      label: t("applications"),
      icon: <FileText className="size-4" />,
      roles: [USER_ROLES.USER],
    },
    {
      id: "saved",
      label: t("saved"),
      icon: <Bookmark className="size-4" />,
      roles: [USER_ROLES.USER],
    },
    {
      id: "jobs",
      label: t("jobs"),
      icon: <Briefcase className="size-4" />,
      roles: [USER_ROLES.COMPANY],
    },
  ]

  const visibleTabs = tabs.filter(
    (tab) => !tab.roles || tab.roles.includes(user.role)
  )

  return (
    <aside className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-4 lg:p-6">
      <nav className="flex flex-col gap-1">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-[rgba(208,188,255,0.12)] text-[#D0BCFF]"
                : "text-[#A1A1AA] hover:bg-[#27272A] hover:text-[#fafafa]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 border-t border-[#27272A] pt-4">
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#F87171] transition-colors hover:bg-[rgba(248,113,113,0.1)] disabled:opacity-50"
        >
          <LogOut className="size-4" />
          {t("logout")}
        </button>
      </div>
    </aside>
  )
}
