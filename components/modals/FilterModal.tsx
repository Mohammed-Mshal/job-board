'use client'

import FilterForm from '@/components/Forms/FilterForm'
import { useJobsStore } from '@/src/store/jobs.store'
import { X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export default function FilterModal() {
  const filterState = useJobsStore((state) => state.filterState)
  const toggleFilterState = useJobsStore((state) => state.toggleFilterState)
  const locale = useLocale()
  const t = useTranslations('forms.filter')
  const isRTL = locale === 'ar'

  return (
    <div
      className={`fixed top-0 left-0 z-99 h-dvh w-full ${filterState ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!filterState}
    >
      <div
        className={`fixed h-full w-full bg-black/25 backdrop-blur-md transition-all duration-300 ${filterState ? 'opacity-100' : 'opacity-0'}`}
        onClick={toggleFilterState}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        className={`filter-wrapper fixed top-0 z-10 h-dvh w-full max-w-md overflow-auto border-border bg-[#111113] transition-all duration-300 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} ${filterState ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-[#111113] px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">{t('title')}</h2>
          <button
            type="button"
            onClick={toggleFilterState}
            className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-background-hover hover:text-foreground"
            aria-label={t('close')}
          >
            <X className="size-5" />
          </button>
        </div>
        <FilterForm />
      </div>
    </div>
  )
}
