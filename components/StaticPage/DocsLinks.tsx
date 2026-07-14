import { Link } from "@/i18n/navigation"
import { ArrowUpRight, BookOpen, Code2, Shield } from "lucide-react"

export interface DocLinkItem {
  title: string
  description: string
  href: string
  external?: boolean
}

interface DocsLinksProps {
  items: DocLinkItem[]
}

const icons = [BookOpen, Code2, Shield, ArrowUpRight]

export default function DocsLinks({ items }: DocsLinksProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length]
        const className = "surface-card group flex flex-col gap-4 transition-colors hover:border-[var(--accent-border)]"

        const content = (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="icon-badge">
                <Icon size={20} />
              </div>
              {item.external ? <ArrowUpRight size={18} className="text-[var(--foreground-muted)]" /> : null}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="text-body-sm">{item.description}</p>
            </div>
          </>
        )

        if (item.external) {
          return (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          )
        }

        return (
          <Link key={item.title} href={item.href} className={className}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}
