'use client'
import React, { useEffect } from 'react'
import { Input } from '../ui/input';
import { useJobsStore } from '@/src/store/jobs.store';
import { useTranslations } from 'next-intl';
import { Filter } from 'lucide-react';

export default function SearchForm() {
    const search = useJobsStore((state) => state.search);
    const location = useJobsStore((state) => state.location);
    const setLocation = useJobsStore((state) => state.setLocation);
    const setSearch = useJobsStore((state) => state.setSearch);
    const fetchJobs = useJobsStore((state) => state.fetchJobs);
    const toggleFilterState = useJobsStore(state=>state.toggleFilterState)
    const t = useTranslations('forms')
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchJobs();
        }, 500);
        return () => clearTimeout(timeout);
    }, [fetchJobs, search, location]);
    return (
        <form className="flex max-w-4xl gap-2 flex-1 my-6" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group flex py-4 px-8 bg-[#111113] rounded-full overflow-hidden w-full">
                <Input className="border-none bg-none" placeholder={t('search')} value={search ?? ''} onChange={(e) => setSearch(e.target.value)} />
                <Input className="border-none bg-none" placeholder={t('city')} value={location ?? ''} onChange={(e) => setLocation(e.target.value)} />
            <button type="button" onClick={toggleFilterState} className="rounded-full base-btn btn-primary flex items-center justify-center p-2 w-14 h-14 shrink-0 cursor-pointer" title="Filter">
                <Filter/>
            </button>
            </div>
        </form>
    )
}
