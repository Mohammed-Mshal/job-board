import React from 'react'
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import { getTranslations } from 'next-intl/server';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import WhyChooseUsCard from './WhyChooseUsCard';
import WhyChooseUsSlider from './WhyChooseUsSlider';
const whyChooseUsCards = [
    {
        image: '/whyChooseUs1.svg',
        title: 'Smart Matching',
        description: `Our neural network matches talent based on technical skills and cultural fit with 94% accuracy.`,
    },
    {
        image: '/whyChooseUs2.svg',
        title: 'App Management',
        description: 'Centralized pipeline for tracking every applicant from initial screening to final offer letter.',
    },
    {
        image: '/whyChooseUs3.svg',
        title: 'Employer Branding',
        description: 'Custom career pages that perfectly reflect your company`s aesthetic and values.',
    },
    {
        image: '/whyChooseUs4.svg',
        title: 'Rich Analytics',
        description: 'Deep insights into your hiring funnel with predictive data on candidate conversion.',
    },
]
export default async function WhyChooseUs() {
    const t = await getTranslations('WhyChooseUsSection');
  return (
    <div className="why-choose-us">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-center gap-12">
            <HeaderSection title={t('title')} description={t('description')} headerDirection="left" />
            <WhyChooseUsSlider valueCards={whyChooseUsCards} />
        </div>
        
    </div>
  )
}
