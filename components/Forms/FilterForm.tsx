'use client'

import { SORT_BY_VALUES } from '@/features/jobs/jobs.validation'
import { useJobsStore } from '@/src/store/jobs.store'
import { JobStatus, JobStatusType } from '@/types/job.types'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'

const selectClassName =
  'w-full min-w-0 rounded-xl border border-[rgba(73,68,84,0.3)] bg-[#111113] px-4 py-3.5 text-base text-foreground outline-none transition-[color,box-shadow,background-color] focus:border-[#8b5cf6] focus:ring-3 focus:ring-[#8b5cf6]/20'

type FilterDraft = {
  status: JobStatusType | null
  sortBy: string | null
  sortOrder: 'asc' | 'desc' | null
  salaryMin: string
  salaryMax: string
}

export default function FilterForm() {

  const t = useTranslations('forms.filter')
  const filterState = useJobsStore((state) => state.filterState)
  const status = useJobsStore((state) => state.status)
  const sortBy = useJobsStore((state) => state.sortBy)
  const sortOrder = useJobsStore((state) => state.sortOrder)
  const salary = useJobsStore((state) => state.salary)
  const setStatus = useJobsStore((state) => state.setStatus)
  const setSortBy = useJobsStore((state) => state.setSortBy)
  const setSortOrder = useJobsStore((state) => state.setSortOrder)
  const setSalary = useJobsStore((state) => state.setSalary)
  const setPage = useJobsStore((state) => state.setPage)
  const fetchJobs = useJobsStore((state) => state.fetchJobs)
  const toggleFilterState = useJobsStore((state) => state.toggleFilterState)
  const clearFilters = useJobsStore((state) => state.clearFilters)

  const [draft, setDraft] = useState<FilterDraft>({
    status: null,
    sortBy: null,
    sortOrder: 'desc',
    salaryMin: '',
    salaryMax: '',
  })

  useEffect(() => {
    if (!filterState) return

    setDraft({
      status,
      sortBy: sortBy ?? 'createdAt',
      sortOrder: sortOrder ?? 'desc',
      salaryMin: salary.min != null ? String(salary.min) : '',
      salaryMax: salary.max != null ? String(salary.max) : '',
    })
  }, [filterState, status, sortBy, sortOrder, salary.min, salary.max])

  const handleApply = async () => {
    const parsedMin = draft.salaryMin.trim() ? Number(draft.salaryMin) : null
    const parsedMax = draft.salaryMax.trim() ? Number(draft.salaryMax) : null

    setStatus(draft.status)
    setSortBy(draft.sortBy)
    setSortOrder(draft.sortOrder)
    setSalary({
      min: Number.isFinite(parsedMin) ? parsedMin : null,
      max: Number.isFinite(parsedMax) ? parsedMax : null,
    })
    setPage(1)
    toggleFilterState()
    await fetchJobs()
  }

  const handleClear = async () => {
    clearFilters()
    toggleFilterState()
    await fetchJobs()
  }

  return (
    <form
      className="flex h-full flex-col gap-6 p-6"
      onSubmit={(event) => {
        event.preventDefault()
        void handleApply()
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-status">{t('status.label')}</Label>
        <select
          title={"filter-status"}
          id="filter-status"
          className={selectClassName}
          value={draft.status ?? ''}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              status: event.target.value ? (event.target.value as JobStatusType) : null,
            }))
          }
        >
          <option value="">{t('status.all')}</option>
          <option value={JobStatus.OPEN}>{t('status.open')}</option>
          <option value={JobStatus.CLOSED}>{t('status.closed')}</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-sort-by">{t('sortBy.label')}</Label>
        <select
        title={"filter-sort-by"}
          id="filter-sort-by"
          className={selectClassName}
          value={draft.sortBy ?? 'createdAt'}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              sortBy: event.target.value,
            }))
          }
        >
          {SORT_BY_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`sortBy.options.${value}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="filter-sort-order">{t('sortOrder.label')}</Label>
        <select

        title="filter-sort-order"
          id="filter-sort-order"
          className={selectClassName}
          value={draft.sortOrder ?? 'desc'}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              sortOrder: event.target.value as 'asc' | 'desc',
            }))
          }
        >
          <option value="desc">{t('sortOrder.desc')}</option>
          <option value="asc">{t('sortOrder.asc')}</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <Label>{t('salary.label')}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="filter-salary-min" className="text-sm text-foreground-muted">
              {t('salary.min')}
            </Label>
            <Input
              id="filter-salary-min"
              type="number"
              min={0}
              placeholder={t('salary.minPlaceholder')}
              value={draft.salaryMin}
              onChange={(event) =>
                setDraft((current) => ({ ...current, salaryMin: event.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="filter-salary-max" className="text-sm text-foreground-muted">
              {t('salary.max')}
            </Label>
            <Input
              id="filter-salary-max"
              type="number"
              min={0}
              placeholder={t('salary.maxPlaceholder')}
              value={draft.salaryMax}
              onChange={(event) =>
                setDraft((current) => ({ ...current, salaryMax: event.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <div className={cn('mt-auto flex flex-col gap-3 pt-4')}>
        <Button type="submit" className="w-full rounded-xl btn btn-primary cursor-pointer py-3">
          {t('apply')}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl cursor-pointer py-3"
          onClick={() => void handleClear()}
        >
          {t('clear')}
        </Button>
      </div>
    </form>
  )
}
