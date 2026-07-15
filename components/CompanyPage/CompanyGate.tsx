"use client"

import { USER_ROLES } from "@/constants/roles"
import { useAuthStore } from "@/store/auth.store"
import { Loader2 } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

interface CompanyGateProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function CompanyGate({
  children,
  redirectTo = "/login",
}: CompanyGateProps) {
  const t = useTranslations("CompanyPage.gate")
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const loading = useAuthStore((state) => state.loading)
  const fetchUser = useAuthStore((state) => state.fetchUser)

  useEffect(() => {
    if (!user && isAuthenticated) {
      void fetchUser()
    }
  }, [user, isAuthenticated, fetchUser])

  if (loading && !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-[#D0BCFF]" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    router.push(redirectTo)
    return null
  }

  if (user.role !== USER_ROLES.COMPANY) {
    return (
      <section className="page-container max-w-3xl py-20">
        <div className="surface-card p-8 text-center">
          <h1 className="text-2xl font-semibold text-[#fafafa]">{t("title")}</h1>
          <p className="mt-3 text-sm text-[#A1A1AA]">{t("description")}</p>
        </div>
      </section>
    )
  }

  return <>{children}</>
}
