"use client"

import { useCompaniesStore } from "@/src/store/companies.store"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import CompanyCard from "../CompanyCard/CompanyCard"

export default function CompanyList() {
  const companies = useCompaniesStore((state) => state.companies)
  const loading = useCompaniesStore((state) => state.loading)
  const t = useTranslations("empty-state.companies")

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2
          className="h-8 w-8 animate-spin text-muted-foreground"
          aria-label="Loading companies..."
        />
      </div>
    )
  }

  if (!companies.length) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <h4 className="text-lg font-bold md:text-xl lg:text-2xl">{t("title")}</h4>
        <p className="text-white/60">{t("description")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  )
}
