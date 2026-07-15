"use client"

import CompanyGate from "@/components/CompanyPage/CompanyGate"
import CompanyJobsManager from "@/components/CompanyPage/CompanyJobsManager"
import { Link } from "@/i18n/navigation"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

export default function CompanyDashboardContent() {
  const t = useTranslations("DashboardPage")

  return (
    <CompanyGate redirectTo="/login?callbackUrl=/dashboard">
      <div className="page-stack pb-20">
        <section className="pt-20">
          <div className="page-container max-w-6xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="badge-subtitle mb-4 inline-flex">{t("subtitle")}</span>
                <h1 className="hero-title">{t("title")}</h1>
                <p className="hero-description mt-3 max-w-2xl">{t("description")}</p>
              </div>
              <Link href="/post-job" className="base-btn btn-primary inline-flex items-center gap-2 px-6 py-3">
                <Plus className="size-4" />
                {t("post-job")}
              </Link>
            </div>
          </div>
        </section>
        <section className="page-container max-w-6xl">
          <CompanyJobsManager showPostJobCta />
        </section>
      </div>
    </CompanyGate>
  )
}
