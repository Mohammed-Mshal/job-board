interface JobNumberedListProps {
  items: string[]
}

export default function JobNumberedList({ items }: JobNumberedListProps) {
  if (!items?.length) return null

  return (
    <ol className="text-[#A1A1AA] flex flex-col gap-4">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3">
          <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-[#211E27] border border-[#494454] text-[#D0BCFF] text-sm font-medium">
            {index + 1}
          </span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  )
}
