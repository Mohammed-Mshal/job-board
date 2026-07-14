"use client"

import { adminService } from "@/services/admin.service"
import { CmsLocale, LocaleCmsContent, SiteVisibilitySettings } from "@/types/cms.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import AdminSidebar, { AdminTab } from "./AdminSidebar"
import AdminGeneralForm from "./AdminGeneralForm"
import AdminHomeForm from "./AdminHomeForm"
import AdminAboutForm from "./AdminAboutForm"
import AdminContactForm from "./AdminContactForm"
import AdminSubmissions from "./AdminSubmissions"
import AdminUsers from "./AdminUsers"
import AdminTestimonials from "./AdminTestimonials"
import AdminUserStatsChart from "./AdminUserStatsChart"
import AdminVisibilityForm from "./AdminVisibilityForm"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"
import { toast } from "react-hot-toast"
import { AdminUserStats } from "@/types/api.types"

export default function AdminDashboard() {
  const t = useTranslations("AdminPage")
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const [locale, setLocale] = useState<CmsLocale>("en")
  const [content, setContent] = useState<Record<CmsLocale, LocaleCmsContent> | null>(null)
  const [visibility, setVisibility] = useState<SiteVisibilitySettings | null>(null)
  const [userStats, setUserStats] = useState<AdminUserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [cmsData, statsData] = await Promise.all([
          adminService.getCmsContent(),
          adminService.getUserStats(),
        ])
        if (cancelled) return
        setContent(cmsData.content)
        setVisibility(cmsData.visibility)
        setUserStats(statsData)
      } catch (error) {
        if (cancelled) return
        toast.error(getApiErrorMessage(error, t("load-error")))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [t])

  if (isLoading || !content || !visibility) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-[#D0BCFF]" />
      </div>
    )
  }

  const localeContent = content[locale]

  return (
    <div className="admin-page space-y-8 pb-20 lg:space-y-12">
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4 xl:max-w-7xl">
          <span className="mb-4 inline-block rounded-full border border-[rgba(208,188,255,0.2)] bg-[rgba(208,188,255,0.1)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#D0BCFF]">
            {t("hero.subtitle")}
          </span>
          <h1 className="text-3xl font-bold text-[#fafafa] lg:text-4xl">{t("hero.title")}</h1>
          <p className="mt-3 max-w-2xl text-sm text-[#A1A1AA] lg:text-base">{t("hero.description")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 xl:max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <AdminSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            locale={locale}
            onLocaleChange={setLocale}
          />

          <div>
            {activeTab === "overview" && (
              <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
                <h2 className="mb-4 text-xl font-semibold text-[#fafafa]">{t("overview.title")}</h2>
                <p className="mb-6 text-sm text-[#A1A1AA]">{t("overview.description")}</p>

                {userStats && <AdminUserStatsChart stats={userStats} />}

                <div className="grid gap-4 sm:grid-cols-2">
                  {(["general", "home", "about", "contact"] as const).map((section) => (
                    <button
                      key={section}
                      type="button"
                      onClick={() => setActiveTab(section)}
                      className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-4 text-left transition-colors hover:border-[#D0BCFF]"
                    >
                      <p className="font-medium text-[#fafafa]">{t(`overview.${section}`)}</p>
                      <p className="mt-1 text-xs text-[#71717A]">{t("overview.edit")}</p>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setActiveTab("users")}
                    className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-4 text-left transition-colors hover:border-[#D0BCFF]"
                  >
                    <p className="font-medium text-[#fafafa]">{t("overview.users")}</p>
                    <p className="mt-1 text-xs text-[#71717A]">{t("overview.manage-users")}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("testimonials")}
                    className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-4 text-left transition-colors hover:border-[#D0BCFF]"
                  >
                    <p className="font-medium text-[#fafafa]">{t("overview.testimonials-reviews")}</p>
                    <p className="mt-1 text-xs text-[#71717A]">{t("overview.moderate-reviews")}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("submissions")}
                    className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-4 text-left transition-colors hover:border-[#D0BCFF]"
                  >
                    <p className="font-medium text-[#fafafa]">{t("overview.submissions")}</p>
                    <p className="mt-1 text-xs text-[#71717A]">{t("overview.view-messages")}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("visibility")}
                    className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-4 text-left transition-colors hover:border-[#D0BCFF]"
                  >
                    <p className="font-medium text-[#fafafa]">{t("overview.visibility")}</p>
                    <p className="mt-1 text-xs text-[#71717A]">{t("overview.manage-visibility")}</p>
                  </button>
                </div>
              </section>
            )}
            {activeTab === "visibility" && (
              <AdminVisibilityForm
                key="visibility"
                initialData={visibility}
                onSaved={setVisibility}
              />
            )}
            {activeTab === "general" && (
              <AdminGeneralForm key={`general-${locale}`} locale={locale} initialData={localeContent.general} />
            )}
            {activeTab === "home" && (
              <AdminHomeForm key={`home-${locale}`} locale={locale} initialData={localeContent.home} />
            )}
            {activeTab === "about" && (
              <AdminAboutForm key={`about-${locale}`} locale={locale} initialData={localeContent.about} />
            )}
            {activeTab === "contact" && (
              <AdminContactForm key={`contact-${locale}`} locale={locale} initialData={localeContent.contact} />
            )}
            {activeTab === "submissions" && <AdminSubmissions />}
            {activeTab === "users" && <AdminUsers />}
            {activeTab === "testimonials" && <AdminTestimonials />}
          </div>
        </div>
      </section>
    </div>
  )
}
