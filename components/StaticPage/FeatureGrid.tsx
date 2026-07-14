import { LucideIcon } from "lucide-react"

export interface FeatureItem {
  title: string
  description: string
}

interface FeatureGridProps {
  items: FeatureItem[]
  icons: LucideIcon[]
}

export default function FeatureGrid({ items, icons }: FeatureGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length]
        return (
          <article key={item.title} className="surface-card space-y-4">
            <div className="icon-badge">
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
            <p className="text-body-sm">{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}
