"use client"

import { Plus, Trash2 } from "lucide-react"

interface AdminRepeaterItemProps {
  label: string
  onRemove: () => void
  canRemove: boolean
  removeLabel: string
  children: React.ReactNode
}

export function AdminRepeaterItem({
  label,
  onRemove,
  canRemove,
  removeLabel,
  children,
}: AdminRepeaterItemProps) {
  return (
    <div className="grid gap-4 rounded-xl border border-[#27272A] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#71717A]">{label}</p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#F87171] transition-colors hover:bg-[rgba(239,68,68,0.1)]"
          >
            <Trash2 className="size-3.5" />
            {removeLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

interface AdminAddItemButtonProps {
  label: string
  onClick: () => void
}

export function AdminAddItemButton({ label, onClick }: AdminAddItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="base-btn btn-secondary inline-flex w-fit items-center gap-2 px-4 py-2 text-sm"
    >
      <Plus className="size-4" />
      {label}
    </button>
  )
}
