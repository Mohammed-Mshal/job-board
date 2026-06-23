'use client'

import { cn } from '@/lib/utils'
import type { SocialIconEntry } from './footer.social'

interface FooterSocialLinksProps {
  links: SocialIconEntry[]
  getLabel: (key: string) => string
  className?: string
}

export default function FooterSocialLinks({
  links,
  getLabel,
  className,
}: FooterSocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {links.map(({ id, labelKey, href, icon: Icon }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getLabel(labelKey)}
            className={cn(
              'flex size-10 items-center justify-center rounded-xl',
              'border border-[#27272A] bg-[#111113] text-[#A1A1AA]',
              'transition-all duration-300',
              'hover:-translate-y-0.5 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
            )}
          >
            <Icon className="size-4" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}
