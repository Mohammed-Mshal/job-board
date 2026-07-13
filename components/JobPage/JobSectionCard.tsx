import { cn } from "@/lib/utils"
import JobSectionTitle from "./JobSectionTitle"

interface JobSectionCardProps {
  title?: string
  accent?: boolean
  className?: string
  children: React.ReactNode
}

export default function JobSectionCard({
  title,
  accent = false,
  className,
  children,
}: JobSectionCardProps) {
  return (
    <section
      className={cn(
        "bg-[#18181B] border-[#27272A] border p-6 rounded-[20px] flex flex-col gap-4",
        className
      )}
    >
      {title && <JobSectionTitle accent={accent}>{title}</JobSectionTitle>}
      {children}
    </section>
  )
}
