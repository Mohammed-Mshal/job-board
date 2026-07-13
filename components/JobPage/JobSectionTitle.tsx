import { cn } from "@/lib/utils"

interface JobSectionTitleProps {
  accent?: boolean
  className?: string
  children: React.ReactNode
}

export default function JobSectionTitle({
  accent = false,
  className,
  children,
}: JobSectionTitleProps) {
  return (
    <h4
      className={cn(
        "text-[#71717A] text-base",
        accent && "ps-4 border-s-2 border-s-[#D0BCFF]",
        className
      )}
    >
      {children}
    </h4>
  )
}
