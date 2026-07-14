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
    <div className={`flex max-w-full flex-col items-center gap-4 lg:max-w-lg ${headerDirection === 'left' ? 'items-start self-start text-start' : headerDirection === 'center' ? 'text-center' : 'text-end'}`}>
      {subtitle && (
        <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <div className="badge-subtitle">
            {subtitle}
          </div>
        </SlideUp>
      )}
      <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
        <h2 className={`text-xl font-bold text-[var(--foreground)] lg:text-2xl xl:text-3xl 2xl:text-4xl ${titleClassName}`}>
          {title}
        </h2>
      </SlideUp>
      <SlideUp delay={0.4} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
        <p className={`text-base text-[var(--foreground-muted)] lg:text-lg ${descriptionClassName}`}>
          {description}
        </p>
      </SlideUp>
    </div>
  )
}
