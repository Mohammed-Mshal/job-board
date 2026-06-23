import React from 'react'
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import { getTranslations } from 'next-intl/server';
import HowItWorksSlider from './HowItWorksSlider';
const valueCards = [
    {
        title: 'Create an account',
        description: 'Sign up for free and start using our platform to find your dream job.',
        icon: '/user-plus.svg',
    },
    {
        title: 'Discover Opportunities',
        description: 'Get matched with high-growth companies using our intelligent AI engine.',
        icon: '/chart-column-increasing.svg',
    },
    {
        title: 'Get Hired ',
        description: 'Connect with hiring managers directly and land your dream role.',
        icon: '/handshake.svg',
    }
]
export default async function HowItWorks() {
    const t = await getTranslations('HowItWorksSection');
  return (
    <div className="how-it-works">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex flex-col items-center justify-center gap-12">
            <HeaderSection title={t('title')} description={t('description')} headerDirection="center" />
            <HowItWorksSlider valueCards={valueCards} />
        </div>
    </div>
  )
}
