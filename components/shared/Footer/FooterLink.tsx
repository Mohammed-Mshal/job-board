'use client'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface FooterLinkProps {
  href: string
  label: string
  external?: boolean
  className?: string
}

export default function FooterLink({
  href,
  label,
  external = false,
  className,
}: FooterLinkProps) {
  const linkClasses = cn(
    'group inline-flex text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#FAFAFA]',
    className,
  )

  const content = (
    <span className="relative">
      {label}
      <span
        aria-hidden
        className="absolute -bottom-px start-0 h-px w-0 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full"
      />
    </span>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={linkClasses}>
      {content}
    </Link>
  )
}
