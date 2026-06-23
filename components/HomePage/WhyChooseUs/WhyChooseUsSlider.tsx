'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import WhyChooseUsCard from './WhyChooseUsCard';
import { SlideUp } from '@/components/motion';
interface WhyChooseUsSliderProps {
    valueCards: {
        image: string;
        title: string;
        description: string;
    }[];
}
export default function WhyChooseUsSlider({ valueCards }: WhyChooseUsSliderProps) {
  return (
    <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="why-choose-us-slider flex flex-col min-w-0 w-full">
        <Swiper
            className="why-choose-us-cards w-full"
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
                el: '.why-choose-us-slider-pagination',
            }}
            modules={[Pagination, Autoplay]}
        >
            {valueCards.map((card, index) => (
                <SwiperSlide key={index}>
                    <WhyChooseUsCard image={card.image} title={card.title} description={card.description} />
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="why-choose-us-slider-pagination static flex w-full! transform-none! mt-6 justify-center"></div>
    </SlideUp>
  )
}
