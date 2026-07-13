import { IJob } from "@/types/job.types"
import { Building, MapPin, User2 } from "lucide-react"
import Image from "next/image"

interface JobHeaderProps {
  job: IJob
  salaryLabel?: string
}

export default function JobHeader({ job, salaryLabel }: JobHeaderProps) {
  const { company, title, location, salary } = job

  return (
    <section className="bg-[#18181B] border-[#27272A] border p-6 sm:p-8 rounded-[20px] flex flex-col sm:flex-row gap-6">
      <div className="bg-[#211E27] border-[#494454] border flex items-center justify-center w-20 h-20 shrink-0 rounded-2xl overflow-hidden p-4">
        {company.profileImage?.url ? (
          <Image
            src={company.profileImage.url}
            alt={company.profileImage.altText || company.name || ""}
            width={48}
            height={48}
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <User2 className="text-[#A1A1AA]" />
        )}
      </div>

      <div className="flex flex-col gap-3 min-w-0">
        <h1 className="text-lg sm:text-xl text-[#fafafa] font-semibold m-0">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {company.name && (
            <div className="flex items-center gap-1.5 text-[#A1A1AA] text-sm">
              <Building size={14} className="shrink-0" />
              <span>{company.name}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1.5 text-[#A1A1AA] text-sm">
              <MapPin size={14} className="shrink-0" />
              <span>{location}</span>
            </div>
          )}
          {salary && (
            <div className="flex items-center gap-1 text-[#D0BCFF] font-semibold text-sm text-nowrap">
              {salary.min != null && (
                <span>
                  {salary.currency}
                  {salary.min}
                </span>
              )}
              {salary.max != null && (
                <span>
                  - {salary.currency}
                  {salary.max}
                </span>
              )}
              {salaryLabel && <span>/ {salaryLabel}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
