import React from 'react'
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import { getTranslations } from 'next-intl/server';
import ValueCard from './ValueCard';
import { Balloon, BriefcaseBusiness, Building2, Users } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import OurValueSwiper from './OurValueSwiper';
const valueCards = [
    {
        title: 'Active Jobs',
        valueNumber: '8,612+',
        icon: <BriefcaseBusiness className='w-full h-full object-contain text-[#D0BCFF]' />,
        wrapperIconColor: 'bg-[rgba(208,188,255,0.1)]'
    },
    {
        title: 'Registered Candidates',
        valueNumber: '2,176+',
        icon: <Users className='w-full h-full object-contain text-[#D2BBFF]' />,
        wrapperIconColor: 'bg-[rgba(210,187,255,0.1)]'
    },
    {
        title: 'Hiring Companies',
        valueNumber: '578+',
        icon: <Building2 className='w-full h-full object-contain text-[rgb(255,184,105)]' />,
        wrapperIconColor: 'bg-[rgba(255,185,105,0.1)]'
    },
    {
        title: 'Successful Hires',
        valueNumber: '3,876+',
        icon: <Balloon  className='w-full h-full object-contain text-[#22C55E]' />,
        wrapperIconColor: 'bg-[rgba(34,197,94,0.1)]'
    }
]
export default async function OurValue() {
    const t = await getTranslations('OurValueSection');
  return (
    <div className="our-value">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-center gap-12">
            <HeaderSection title={t('title')} description={t('description')} headerDirection="center" />
            <OurValueSwiper valueCards={valueCards} />
        </div>
    </div>
  )
}
