"use client"
import { useJobsStore } from '@/src/store/jobs.store';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'
import JobCard from '../JobCard/JobCard';

export default function JobList() {
    const jobs=useJobsStore(state=>state.jobs)
    const loading=useJobsStore(state=>state.loading)
    const t = useTranslations('empty-state.jobs')
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-label="Loading jobs..." />
        </div>
      )
    }
    return (
      <>
        {
          jobs.length>0?
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {
              jobs.map((job)=>(
                <JobCard key={job._id} job={job}/>
              ))
            }
          </div>
          :
          <div className="flex flex-col gap-2 text-center items-center">
            <h4 className="title lg:text-2xl md:text-xl text-lg font-bold">
              {t('title')}
            </h4>
            <div className="desc text-white/60">
              {t('description')}
            </div>
          </div>
        }
      </>
    )
}
