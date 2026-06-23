'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import WorkItem from './WorkItem';
import { Autoplay, Pagination } from 'swiper/modules';
import { SlideUp } from '@/components/motion';
interface HowItWorksSliderProps {
    valueCards: {
        title: string;
        description: string;
        icon: string;
    }[];
}
export default function HowItWorksSlider({ valueCards }: HowItWorksSliderProps) {
  return (
    <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="how-it-works-slider flex flex-col min-w-0 w-full">
        <Swiper
            className="how-it-works-cards w-full"
            spaceBetween={32}
            breakpoints={{
                0: { slidesPerView: 1,},
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
                el: '.how-it-works-slider-pagination',
            }}
            modules={[Pagination, Autoplay]}
        >
            {valueCards.map((card, index) => (
                <SwiperSlide key={index}>
                    <WorkItem
                        title={card.title}
                        Icon={card.icon}
                        description={card.description}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="how-it-works-slider-pagination static flex w-full! transform-none! mt-6 justify-center"></div>
    </SlideUp>
  )
}
