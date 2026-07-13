interface JobInfoRowProps {
  label: string
  value: React.ReactNode
}

export default function JobInfoRow({ label, value }: JobInfoRowProps) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-[#A1A1AA]">{label}</span>
      <span className="text-[#fafafa] text-end">{value}</span>
    </div>
  )
}
