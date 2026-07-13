import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface JobIconListProps {
  items: string[]
  icon: LucideIcon
  iconClassName?: string
  className?: string
}

export default function JobIconList({
  items,
  icon: Icon,
  iconClassName,
  className,
}: JobIconListProps) {
  if (!items?.length) return null

  return (
    <ul className={cn("text-[#A1A1AA] flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Icon
            size={16}
            className={cn("text-[#D0BCFF] shrink-0", iconClassName)}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
