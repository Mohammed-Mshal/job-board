import React from 'react'
import { PopIn, SlideUp } from '@/components/motion';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function Banner() {
  const t = await getTranslations('Banner');

  return (
    <div className="banner pt-20">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 text-center flex justify-center">
            <div className="flex flex-col items-center justify-center gap-6 max-w-3xl">
                <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
                    <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl text-4xl font-bold flex flex-col leading-normal">
                        <span>
                            {t('title')}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D0BCFF] to-[#A078FF]">
                            {t('title-highlight')}
                        </span>
                    </h1>
                </SlideUp>
                <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
                    <div className="banner-desc">
                        <p className="text-lg text-[#A1A1AA]">
                            {t('description')}
                        </p>
                    </div>
                </SlideUp>
                <div className="banner-cta flex items-center justify-center gap-4">
                    <PopIn whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="flex">
                        <Link href="/jobs" className="base-btn btn-primary">
                            {t('cta')}
                        </Link>
                    </PopIn>
                    <PopIn whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="flex">
                        <Link href="/categories" className="base-btn btn-secondary">
                            {t('cta-secondary')}
                        </Link>
                    </PopIn>
                </div>
            </div>
        </div>
    </div>
  )
}
