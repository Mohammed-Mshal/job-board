import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-xl border px-4 py-3 text-sm outline-none transition-[color,box-shadow,border-color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--foreground-disabled)] focus:border-[var(--input-focus)] focus:shadow-[var(--shadow-primary)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
