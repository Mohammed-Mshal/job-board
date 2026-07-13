import React from 'react'
import { getApprovedTestimonials } from '@/lib/getTestimonials'
import { HomeSectionTitleCms } from '@/types/cms.types'
import TestimonialsClient from './TestimonialsClient'
export default async function Testimonials({
  sectionContent,
}: {
  sectionContent?: HomeSectionTitleCms & { subtitle: string }
}) {
  const testimonials = await getApprovedTestimonials()
  return (
    <TestimonialsClient
      sectionContent={sectionContent}
      testimonials={testimonials}
    />
  )
}

