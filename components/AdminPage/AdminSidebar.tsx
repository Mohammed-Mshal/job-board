"use client"

import { CmsLocale } from "@/types/cms.types"
import { cn } from "@/lib/utils"
import {
  FileText,
  Globe,
  Home,
  Info,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"

export type AdminTab = "overview" | "general" | "home" | "about" | "contact" | "submissions" | "users" | "testimonials"

interface AdminSidebarProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  locale: CmsLocale
  onLocaleChange: (locale: CmsLocale) => void
}

export default function AdminSidebar({
  activeTab,
  onTabChange,
  locale,
  onLocaleChange,
}: AdminSidebarProps) {
  const t = useTranslations("AdminPage.tabs")

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: t("overview"), icon: <LayoutDashboard className="size-4" /> },
    { id: "general", label: t("general"), icon: <Globe className="size-4" /> },
    { id: "home", label: t("home"), icon: <Home className="size-4" /> },
    { id: "about", label: t("about"), icon: <Info className="size-4" /> },
    { id: "contact", label: t("contact"), icon: <FileText className="size-4" /> },
    { id: "users", label: t("users"), icon: <Users className="size-4" /> },
    { id: "testimonials", label: t("testimonials"), icon: <MessageSquare className="size-4" /> },
    { id: "submissions", label: t("submissions"), icon: <Inbox className="size-4" /> },
  ]

  return (
    <aside className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-4 lg:p-6 h-fit max-h-[500px] sticky top-32">
      <div className="mb-4 flex gap-2">
        {(["en", "ar"] as CmsLocale[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onLocaleChange(item)}
            className={cn(
              "flex-1 rounded-xl px-3 py-2 text-xs font-bold uppercase",
              locale === item
                ? "bg-[rgba(208,188,255,0.12)] text-[#D0BCFF]"
                : "bg-[#27272A] text-[#A1A1AA]"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <nav className="flex flex-col gap-1 overflow-y-auto max-h-[400px]">
        {tabs.map((tab) => (
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
    </aside>
  )
}
