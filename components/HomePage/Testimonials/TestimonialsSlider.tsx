'use client'
import { SlideUp } from '@/components/motion';
import { ITestimonial } from '@/types/testimonial.types';
import { getUserAvatarUrl } from '@/lib/getUserAvatarUrl';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function getAvatarUrl(testimonial: ITestimonial) {
  return getUserAvatarUrl(testimonial.name, testimonial.image);
}

export default function TestimonialsSlider({ testimonials }: { testimonials: ITestimonial[] }) {
  const t = useTranslations('TestimonialsSection');

  if (!testimonials.length) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[rgba(73,68,84,0.3)] bg-[rgba(21,18,27,0.6)] p-8 text-center lg:rounded-4xl">
        <p className="text-lg font-semibold text-[#fafafa]">{t('empty-title')}</p>
        <p className="mt-2 text-sm text-[#A1A1AA]">{t('empty-description')}</p>
      </div>
    );
  }

  return (
    <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }} className="testimonials-slider-wrapper flex flex-col min-w-0 w-full">
        <Swiper
            spaceBetween={12}
            slidesPerView={1}
            centeredSlides={true}
            allowTouchMove={false}
            allowSlideNext={false}
            allowSlidePrev={false}
            loop={testimonials.length > 1}
            speed={1000}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={{
                nextEl: '.testimonials-slider-next',
                prevEl: '.testimonials-slider-prev',
            }}
            modules={[Autoplay,Navigation]}
            className="testimonials-slider w-full"
        >
            {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial._id} className="flex! flex-col gap-4 lg:p-8 p-4 lg:rounded-4xl rounded-2xl relative bg-[rgba(21,18,27,0.6)] border border-[rgba(73,68,84,0.3)]">
                    <div className="icon-quote text-[rgba(208,188,255,0.1)] absolute top-6 inset-e-6">
                        <Quote className="size-12" />
                    </div>
                    <div className="profile flex items-center gap-4">
                        <div className="image-profile w-14 h-14 rounded-full overflow-hidden">
                            <Image src={getAvatarUrl(testimonial)} alt={testimonial.name} width={56} height={56} className="w-full h-full object-cover" />
                        </div>
                        <div className="info-profile flex flex-col gap-1">
                            <h3 className="name text-lg font-bold leading-4">{testimonial.name}</h3>
                            <p className="job-title text-sm text-[#A1A1AA]">{testimonial.jobTitle}</p>
                        </div>
                    </div>
                    <div className="rating flex items-center gap-2">
                        {Array.from({ length: testimonial.rating }).map((_, index) => (
                            <Star className="size-4 fill-[#F59E0B] text-[#F59E0B]" key={index} />
                        ))}
                    </div>
                    <p className="testimonial lg:text-2xl text-lg font-medium text-white/80">{testimonial.testimonial}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    </SlideUp>
  )
}
