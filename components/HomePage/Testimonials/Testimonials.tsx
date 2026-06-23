import React from 'react'
import HeaderSection from '@/components/shared/HeaderSection/HeaderSection';
import { getLocale, getTranslations } from 'next-intl/server';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialsSlider from './TestimonialsSlider';
export default async function Testimonials() {
    const t = await getTranslations('TestimonialsSection');
    const locale= await getLocale()
    console.log(locale);
    
    const testimonials = [
        {
            id: '1',
            name: 'John Doe',
            jobTitle: 'Software Engineer',
            testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
            image: 'https://placehold.co/600x400/png?text=J',
            rating: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'Jane Doe',
            jobTitle: 'Software Engineer',
            testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
            image: 'https://placehold.co/600x400/png?text=J',
            rating: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]
  return (
    <div className="testimonials py-12 bg-[rgba(29,26,35,0.30)]">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex items-center justify-between lg:gap-12 gap-8 flex-col lg:flex-row">
            <div className="left-side flex flex-col gap-4 w-full lg:w-auto">
                <HeaderSection title={t('title')} subtitle={t('subtitle')} description={t('description')} headerDirection="left" />
                <div className="testimonials-nav-buttons flex items-center gap-4">
                    <button className="testimonials-nav-button testimonials-slider-prev cursor-pointer border border-[#4944544d] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:bg-[#4944544d] transition-all duration-300" type="button" title="Previous Testimonial">
                       {
                        locale === 'ar' ? <ChevronRight className="w-full h-full object-contain" /> : <ChevronLeft className="w-full h-full object-contain" />  
                       } 
                    </button>
                    <button className="testimonials-nav-button testimonials-slider-next cursor-pointer border border-[#4944544d] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:bg-[#4944544d] transition-all duration-300" type="button" title="Next Testimonial">
                        {
                            locale === 'ar' ? <ChevronLeft className="w-full h-full object-contain" /> : <ChevronRight className="w-full h-full object-contain" />
                        }
                    </button>
                </div>
            </div>
            <div className="right-side w-full min-w-0  max-w-full lg:max-w-lg">
                <TestimonialsSlider testimonials={testimonials} />
            </div>
        </div>
    </div>
  )
}
