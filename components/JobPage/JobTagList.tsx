interface JobTagListProps {
  items: string[]
}

export default function JobTagList({ items }: JobTagListProps) {
  if (!items?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tag) => (
        <span
          key={tag}
          className="bg-[#27272A] border-[#494454] border rounded-lg px-3 py-1 text-[#A1A1AA] text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
