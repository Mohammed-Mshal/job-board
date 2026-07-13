"use client"

import { ICompany } from "@/types/company.types"
import { Building2, MapPin, Users, Briefcase } from "lucide-react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

export default function CompanyCard({ company }: { company: ICompany }) {
  const t = useTranslations("CompaniesPage")

  return (
    <article className="relative flex flex-col gap-4 rounded-3xl border border-[rgba(73,68,84,0.1)] bg-[#18181B] p-8">
      <Link
        href={`/companies/${company.userId}`}
        className="absolute inset-0 z-10 rounded-3xl"
        aria-label={company.name}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#494454] bg-[#211E27] p-2">
          {company.profileImage?.url ? (
            <Image
              src={company.profileImage.url}
              alt={company.profileImage.altText || company.name}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Building2 className="text-[#A1A1AA]" size={28} />
            </div>
          )}
        </div>

        {company.openJobsCount > 0 && (
          <span className="relative z-20 rounded-full bg-[rgba(208,188,255,0.1)] px-4 py-1.5 text-xs font-bold text-[#D8B4FE]">
            {company.openJobsCount} {t("open-jobs")}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold lg:text-2xl">{company.name}</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#A1A1AA]">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {company.location}
          </span>
          {company.teamSize && (
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {company.teamSize.min}-{company.teamSize.max} {t("people")}
            </span>
          )}
        </div>
      </div>

      <p className="line-clamp-3 text-sm font-medium text-[#A1A1AA]">
        {company.description}
      </p>

      <div className="flex items-center justify-between border-t border-[rgba(73,68,84,0.1)] pt-6">
        <span className="flex items-center gap-2 text-sm text-[#71717A]">
          <Briefcase size={16} className="text-[#D0BCFF]" />
          {company.openJobsCount} {t("positions")}
        </span>
        <span className="relative z-20 text-sm font-semibold text-[#D0BCFF]">
          {t("view-company")}
        </span>
      </div>
    </article>
  )
}
