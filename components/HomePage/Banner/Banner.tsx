import React from 'react'
import { PopIn, SlideUp } from '@/components/motion';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { HomeBannerCms } from '@/types/cms.types';

export default async function Banner({ content }: { content?: HomeBannerCms }) {
  const t = await getTranslations('Banner');
  const title = content?.title ?? t('title');
  const titleHighlight = content?.titleHighlight ?? t('title-highlight');
  const description = content?.description ?? t('description');
  const cta = content?.cta ?? t('cta');
  const ctaSecondary = content?.ctaSecondary ?? t('cta-secondary');
  const ctaHref = content?.ctaHref ?? '/jobs';
  const ctaSecondaryHref = content?.ctaSecondaryHref ?? '/categories';

  return (
    <div className="banner pt-20">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 text-center flex justify-center">
            <div className="flex flex-col items-center justify-center gap-6 max-w-3xl">
                <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
                    <h1 className="2xl:text-7xl xl:text-6xl lg:text-5xl text-4xl font-bold flex flex-col leading-normal">
                        <span>
                            {title}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D0BCFF] to-[#A078FF]">
                            {titleHighlight}
                        </span>
                    </h1>
                </SlideUp>
                <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
                    <div className="banner-desc">
                        <p className="text-lg text-[#A1A1AA]">
                            {description}
                        </p>
                    </div>
                </SlideUp>
                <div className="banner-cta flex items-center justify-center gap-4">
                    <PopIn whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="flex">
                        <Link href={ctaHref} className="base-btn btn-primary">
                            {cta}
                        </Link>
                    </PopIn>
                    <PopIn whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="flex">
                        <Link href={ctaSecondaryHref} className="base-btn btn-secondary">
                            {ctaSecondary}
                        </Link>
                    </PopIn>
                </div>
            </div>
        </div>
    </div>
  )
}
