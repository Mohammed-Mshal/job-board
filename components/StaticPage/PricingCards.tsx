import { Link } from "@/i18n/navigation"
import { Check } from "lucide-react"

export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
  href: string
}

interface PricingCardsProps {
  plans: PricingPlan[]
}

export default function PricingCards({ plans }: PricingCardsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`surface-card flex flex-col gap-6 ${
            plan.highlighted ? "border-[var(--accent-border)] ring-1 ring-[var(--accent-border)]" : ""
          }`}
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{plan.name}</h3>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-[var(--foreground)]">{plan.price}</span>
              {plan.period ? (
                <span className="text-body-sm pb-1">/{plan.period}</span>
              ) : null}
            </div>
            <p className="text-body-sm">{plan.description}</p>
          </div>
          <ul className="flex flex-1 flex-col gap-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]">
                <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={plan.href}
            className={`base-btn w-full text-center ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
          >
            {plan.cta}
          </Link>
        </article>
      ))}
    </div>
  )
}
