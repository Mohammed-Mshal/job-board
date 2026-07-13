import { ICompany } from "@/types/company.types"
import { Building2, MapPin, Users, Briefcase } from "lucide-react"
import Image from "next/image"

interface CompanyHeaderProps {
  company: ICompany
  labels: {
    teamSize: string
    people: string
    openJobs: string
    memberSince: string
  }
  memberSince: string
}

export default function CompanyHeader({
  company,
  labels,
  memberSince,
}: CompanyHeaderProps) {
  return (
    <section className="flex flex-col gap-6 rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 sm:p-8 sm:flex-row">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#494454] bg-[#211E27] p-4">
        {company.profileImage?.url ? (
          <Image
            src={company.profileImage.url}
            alt={company.profileImage.altText || company.name}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        ) : (
          <Building2 className="text-[#A1A1AA]" size={40} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <h1 className="m-0 text-2xl font-semibold text-[#fafafa] sm:text-3xl">
          {company.name}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#A1A1AA]">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {company.location}
          </span>
          {company.teamSize && (
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {labels.teamSize}: {company.teamSize.min}-{company.teamSize.max}{" "}
              {labels.people}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Briefcase size={14} className="text-[#D0BCFF]" />
            {company.openJobsCount} {labels.openJobs}
          </span>
        </div>

        <p className="text-sm text-[#71717A]">
          {labels.memberSince}: {memberSince}
        </p>
      </div>
    </section>
  )
}
