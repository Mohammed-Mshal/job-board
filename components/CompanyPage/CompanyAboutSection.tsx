import { ICompany } from "@/types/company.types"

interface CompanyAboutSectionProps {
  company: ICompany
  label: string
}

export default function CompanyAboutSection({
  company,
  label,
}: CompanyAboutSectionProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[20px] border border-[#27272A] bg-[#18181B] p-6">
      <h2 className="text-base text-[#71717A] ps-4 border-s-2 border-s-[#D0BCFF]">
        {label}
      </h2>
      <p className="leading-relaxed text-[#A1A1AA]">{company.description}</p>
    </section>
  )
}
