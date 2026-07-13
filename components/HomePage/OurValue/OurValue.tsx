import React from 'react'
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import { getTranslations } from 'next-intl/server';
import ValueCard from './ValueCard';
import { Balloon, BriefcaseBusiness, Building2, Users } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import OurValueSwiper from './OurValueSwiper';
import { HomeSectionTitleCms, HomeStatCms } from '@/types/cms.types';

const defaultIcons = [
    <BriefcaseBusiness key="jobs" className='w-full h-full object-contain text-[#D0BCFF]' />,
    <Users key="users" className='w-full h-full object-contain text-[#D2BBFF]' />,
    <Building2 key="companies" className='w-full h-full object-contain text-[rgb(255,184,105)]' />,
    <Balloon key="hires" className='w-full h-full object-contain text-[#22C55E]' />,
]

const defaultColors = [
    'bg-[rgba(208,188,255,0.1)]',
    'bg-[rgba(210,187,255,0.1)]',
    'bg-[rgba(255,185,105,0.1)]',
    'bg-[rgba(34,197,94,0.1)]',
]

export default async function OurValue({
  sectionContent,
  stats,
}: {
  sectionContent?: HomeSectionTitleCms
  stats?: HomeStatCms[]
}) {
    const t = await getTranslations('OurValueSection');
    const defaultStats = [
        { title: 'Active Jobs', valueNumber: '8,612+' },
        { title: 'Registered Candidates', valueNumber: '2,176+' },
        { title: 'Hiring Companies', valueNumber: '578+' },
        { title: 'Successful Hires', valueNumber: '3,876+' },
    ];
    const valueCards = (stats?.length ? stats : defaultStats).map((stat, index) => ({
        title: stat.title,
        valueNumber: stat.valueNumber,
        icon: defaultIcons[index] ?? defaultIcons[0],
        wrapperIconColor: defaultColors[index] ?? defaultColors[0],
    }));

  return (
    <div className="our-value">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-center gap-12">
            <HeaderSection title={sectionContent?.title ?? t('title')} description={sectionContent?.description ?? t('description')} headerDirection="center" />
            <OurValueSwiper valueCards={valueCards} />
        </div>
    </div>
  )
}
