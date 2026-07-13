import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface JobStatCardProps {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  className?: string
}

export default function JobStatCard({
  icon: Icon,
  label,
  value,
  className,
}: JobStatCardProps) {
  return (
    <div
      className={cn(
        "bg-[#18181B] border-[#27272A] border p-5 rounded-[20px] flex flex-col gap-3 lg:col-span-1 sm:col-span-2 col-span-4",
        className
      )}
    >
      <Icon className="text-[#D0BCFF]" size={20} />
      <h4 className="text-[#71717A] text-base">{label}</h4>
      <div className="text-[#fafafa]">{value}</div>
    </div>
  )
}
