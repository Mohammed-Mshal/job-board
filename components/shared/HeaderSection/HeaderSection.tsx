import { SlideUp } from '@/components/motion';
import React from 'react'

interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  headerDirection: 'left' | 'center' | 'right';
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function HeaderSection({ title, subtitle, description, headerDirection, titleClassName, descriptionClassName }: HeaderSectionProps) {
  return (
    <div className={`flex flex-col items-center gap-4 max-w-full lg:max-w-lg ${headerDirection === 'left' ? 'text-start items-start self-start' : headerDirection === 'center' ? 'text-center' : 'text-right'}`}>
      {
        subtitle && (
          <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <div className={`text-xs font-bold bg-[rgba(208,188,255,0.1)] border border-[rgba(208,188,255,0.2)] text-[#D0BCFF] uppercase tracking-wider py-1 px-4 rounded-full`}>
            {subtitle}
          </div>
        </SlideUp>
        )
      }
      <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
        <h2 className={`2xl:text-4xl xl:text-3xl lg:text-2xl text-xl font-bold text-white ${titleClassName}`}>
          {title}
        </h2>
      </SlideUp>
      <SlideUp delay={0.4} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
        <p className={`lg:text-lg text-base text-white/60 ${descriptionClassName}`}>
          {description}
        </p>
      </SlideUp>
    </div>
  )
}
