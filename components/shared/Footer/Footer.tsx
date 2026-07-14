'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion'
import FooterLink from './FooterLink'
import FooterSocialLinks from './FooterSocialLinks'
import { footerColumns, FooterColumnConfig } from './footer.config'
import { socialIconEntries } from './footer.social'

interface FooterProps {
  siteName?: string
  siteDescription?: string
  footerCopyright?: string
  footerTagline?: string
  columns?: FooterColumnConfig[]
}

export default function Footer({
  siteName,
  siteDescription,
  footerCopyright,
  footerTagline,
  columns = footerColumns,
}: FooterProps) {
  const t = useTranslations('Footer')
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto w-full bg-[#09090B]"
      aria-labelledby="footer-heading"
    >
      <SlideUp
        className="mx-auto container xl:max-w-7xl px-4 pt-16 pb-4 md:pb-8"
        viewport={{ amount: 0.15 }}
      >
        <h2 id="footer-heading" className="sr-only">
          {t('heading')}
        </h2>

        {/* Top section */}
        <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-start lg:justify-between lg:pb-16">
          <div className="max-w-md space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
              aria-label={t('brandLabel')}
            >
              <Image
                src="/jobify-logo.svg"
                alt=""
                width={40}
                height={40}
                className="size-10 object-contain"
              />
              <span className="text-xl font-semibold tracking-tight text-[#FAFAFA]">
                {siteName ?? 'Jobify'}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#A1A1AA] md:text-base">
              {siteDescription ?? t('description')}
            </p>
          </div>

          <FooterSocialLinks
            links={socialIconEntries}
            getLabel={(key) => t(key)}
            className="lg:pt-1"
          />
        </div>

        {/* Desktop & tablet columns */}
        <StaggerContainer
          className="hidden border-t border-[#27272A] py-12 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 lg:gap-12"
          viewport={{ amount: 0.1 }}
        >
          {columns.map((column) => (
            <StaggerItem key={column.id}>
              <nav aria-label={t(column.titleKey)}>
                <h3 className="mb-5 text-sm font-semibold tracking-wide text-[#FAFAFA]">
                  {t(column.titleKey)}
                </h3>
                <ul className="space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.labelKey}>
                      <FooterLink
                        href={link.href}
                        label={t(link.labelKey)}
                        external={link.external}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile accordion */}
        <div className="border-t border-[#27272A] py-8 md:hidden">
          <Accordion type="single" collapsible className="border-[#27272A] bg-[#111113]">
            {columns.map((column) => (
              <AccordionItem key={column.id} value={column.id}>
                <AccordionTrigger className="text-[#FAFAFA] hover:no-underline">
                  {t(column.titleKey)}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.labelKey}>
                        <FooterLink
                          href={link.href}
                          label={t(link.labelKey)}
                          external={link.external}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom section */}
        <div className="border-t border-[#27272A] pt-8">
          <div className="flex flex-col gap-2 sm:flex-row items-center sm:justify-between">
            <p className="text-sm text-[#A1A1AA]">
              {(footerCopyright ?? t('copyright', { year })).replace('{year}', String(year))}
            </p>
            <p className="text-xs text-[#71717A]">{footerTagline ?? t('tagline')}</p>
          </div>
        </div>
      </SlideUp>
    </footer>
  )
}
