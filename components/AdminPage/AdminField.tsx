"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  type?: string
}

export function AdminField({
  id,
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 py-3 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="border-[#27272A] bg-[#0f0f11]"
        />
      )}
    </div>
  )
}
