"use client"

import { useRouter } from "@/i18n/navigation"
import { userService } from "@/services/user.service"
import { useAuthStore } from "@/store/auth.store"
import { PublicUser } from "@/types/api.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import ProfileApplications from "./ProfileApplications"
import ProfileCompanyJobs from "./ProfileCompanyJobs"
import ProfileEditForm from "./ProfileEditForm"
import ProfileMessages from "./ProfileMessages"
import ProfileOverview from "./ProfileOverview"
import ProfilePasswordForm from "./ProfilePasswordForm"
import ProfileSavedJobs from "./ProfileSavedJobs"
import ProfileSidebar, { ProfileTab } from "./ProfileSidebar"

export default function ProfilePageContent() {
  const t = useTranslations("ProfilePage")
  const router = useRouter()
  const authUser = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const [profile, setProfile] = useState<PublicUser | null>(authUser)
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const loadProfile = useCallback(async () => {
    setIsLoading(true)

    try {
      const data = await userService.getProfile()
      setProfile(data)
    } catch {
      if (authUser) {
        setProfile(authUser)
      } else if (!isAuthenticated) {
        router.push("/login")
      }
    } finally {
      setIsLoading(false)
    }
  }, [authUser, isAuthenticated, router])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await userService.getProfile()
        if (cancelled) return
        setProfile(data)
      } catch {
        if (cancelled) return
        if (authUser) {
          setProfile(authUser)
        } else if (!isAuthenticated) {
          router.push("/login")
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [authUser, isAuthenticated, router])

  const handleUpdated = () => {
    void loadProfile()
    void fetchUser()
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push("/")
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isLoading && !profile) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-[#D0BCFF]" />
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="profile-page space-y-8 pb-20 lg:space-y-12">
      <section className="pt-20 pb-4">
        <div className="container mx-auto px-4 xl:max-w-7xl">
          <span className="mb-4 inline-block rounded-full border border-[rgba(208,188,255,0.2)] bg-[rgba(208,188,255,0.1)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#D0BCFF]">
            {t("hero.subtitle")}
          </span>
          <h1 className="text-3xl font-bold text-[#fafafa] lg:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#A1A1AA] lg:text-base">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 xl:max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ProfileSidebar
            user={profile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={() => void handleLogout()}
            isLoggingOut={isLoggingOut}
          />

          <div>
            {activeTab === "overview" && (
              <ProfileOverview user={profile} onUpdated={handleUpdated} />
            )}
            {activeTab === "edit" && (
              <ProfileEditForm user={profile} onUpdated={handleUpdated} />
            )}
            {activeTab === "security" && <ProfilePasswordForm />}
            {activeTab === "messages" && <ProfileMessages />}
            {activeTab === "applications" && <ProfileApplications />}
            {activeTab === "saved" && <ProfileSavedJobs />}
            {activeTab === "jobs" && <ProfileCompanyJobs />}
          </div>
        </div>
      </section>
    </div>
  )
}
