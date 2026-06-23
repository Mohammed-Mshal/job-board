'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import ValueCard from './ValueCard';
import { SlideUp } from '@/components/motion';
interface OurValueSwiperProps {
    valueCards: {
        title: string;
        valueNumber: string;
        icon: React.ReactNode;
        wrapperIconColor: string;
    }[];
}
export default function OurValueSwiper({ valueCards }: OurValueSwiperProps) {
  return (
    <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="our-value-swiper flex flex-col min-w-0 w-full">
        <Swiper
            className="our-value-swiper-cards w-full"
            spaceBetween={32}
            breakpoints={{
                0: { slidesPerView: 1},
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            }}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
                el: '.our-value-swiper-pagination',
            }}
            modules={[Pagination, Autoplay]}
        >
            {valueCards.map((card, index) => (
                <SwiperSlide key={index}>
                    <ValueCard
                        title={card.title}
                        valueNumber={card.valueNumber}
                        icon={card.icon}
                        wrapperIconColor={card.wrapperIconColor}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="our-value-swiper-pagination static flex w-full! transform-none! mt-6 justify-center"></div>
    </SlideUp>
    )
}
