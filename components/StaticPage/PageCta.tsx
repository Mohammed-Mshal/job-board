import { Link } from "@/i18n/navigation"

interface PageCtaProps {
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function PageCta({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PageCtaProps) {
  return (
    <section className="surface-card flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <h2 className="heading-subsection mb-0">{title}</h2>
        <p className="text-body-sm">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={primaryHref} className="base-btn btn-primary">
          {primaryLabel}
        </Link>
        {secondaryLabel && secondaryHref ? (
          <Link href={secondaryHref} className="base-btn btn-secondary">
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
