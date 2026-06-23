'use client'
import React from 'react'
import { IJob } from '@/types/job.types'
import Image from 'next/image'
import { useLocale } from 'next-intl';
import { formatDistance } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { Bookmark} from 'lucide-react';

export default function JobCard({ job }: { job: IJob }) {
  const localeLang = useLocale();
  const locale = localeLang === 'ar' ? ar : enUS;
  return (
    <div className="job-card flex flex-col gap-3 bg-[#18181B] rounded-3xl p-8 border border-[rgba(73,68,84,0.1)]">
        <div className="header-card flex items-start justify-between gap-4">
          <div className="image-profile h-16 w-16 rounded-full overflow-hidden">
            <Image src={job.company.profileImage?.url || ''} alt={job.company.name || ''} width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            {
                true &&
                  <span className="bg-[rgba(208,188,255,0.1)] text-[#D8B4FE] text-xs font-bold px-4 py-1.5 rounded-full">NEW</span>
              }
              {
                false &&
                  <span className="bg-[#22C55E1a] text-[#22C55E] text-xs font-bold px-4 py-1.5 rounded-full">NEW</span>
              }
          </div>
        </div>
        <h3 className="title font-bold lg:text-2xl text-xl">{job.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[#A1A1AA] text-sm font-medium">
            {job.company.name}
          </span>
          <span className="bg-[#494454] w-1 h-1 rounded-full"></span>
          <span className="text-[#A1A1AA] text-sm font-medium">
            {job.location}
          </span>
        </div>
        <div className="description text-[#A1A1AA] text-sm font-medium line-clamp-4">
          {job.description}
        </div>
        <div className="requirements flex items-center flex-wrap gap-2 py-4">
          {
            job.requirements.map((requirement) => (
              <span key={requirement} className="bg-[#27272A] text-[#CBC3D7] text-xs font-bold px-4 py-1.5 rounded-full">
                {requirement}
              </span>
            ))
          }
        </div>
        <div className="footer-card flex items-center justify-between gap-4 pt-6 border-t border-[rgba(73,68,84,0.1)]">
          <div className="flex flex-col gap-1">
            <span className="text-[#FFFFFF] text-lg font-bold">

              {job.salary.min} - {job.salary.max}
            </span>
            <span className="text-[#71717A] text-xs">
              {formatDistance(new Date(job.createdAt), new Date(), { locale })}
            </span>
          </div>
          <button type="button" className="bg-[#27272A] text-[#71717A] hover:text-[#FFFFFF] hover:bg-[#3F3F46] transition-all duration-300 text-sm font-bold size-12 flex items-center justify-center rounded-xl cursor-pointer" title="Save Job">
            <Bookmark className="size-6" />
          </button>
        </div>
    </div>
  )
}
