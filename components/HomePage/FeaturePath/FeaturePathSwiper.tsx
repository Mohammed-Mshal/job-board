'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { SlideUp } from '@/components/motion';
import JobCard from '@/components/JobCard/JobCard';
import { IJob } from '@/types/job.types';
import { useTranslations } from 'next-intl';

export default function FeaturePathSwiper({ jobs }: { jobs: IJob[] }) {
    const t = useTranslations('empty-state.jobs');
    if (jobs.length > 0) {
        return (
            <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="feature-path-swiper flex flex-col min-w-0 w-full">
                <Swiper className="feature-path-swiper-slides w-full"
                spaceBetween={32}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    el: '.feature-path-swiper-pagination',
                }}
                modules={[Pagination, Autoplay]}
                >
                    {jobs.map((job, index) => (
                        <SwiperSlide className="feature-path-swiper-slide" key={index}>
                            <JobCard job={job} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="feature-path-swiper-pagination static flex w-full! transform-none! mt-6 justify-center"></div>
            </SlideUp>
        )
    }
    return (
    <div className="feature-path-empty-state flex flex-col items-center justify-center min-h-[220px] text-center">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {t('title')}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
            {t('description')}
        </p>
    </div>
        
    )
}