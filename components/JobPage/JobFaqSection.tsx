"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface JobFaqSectionProps {
  items: {
    question: string
    answer: string
  }[]
}

export default function JobFaqSection({ items }: JobFaqSectionProps) {
  if (!items?.length) return null

  return (
    <Accordion
      type="single"
      collapsible
      className="border-[#27272A] bg-transparent"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.question}-${index}`}
          value={`faq-${index}`}
          className="border-[#27272A] data-open:bg-[#211E27]"
        >
          <AccordionTrigger className="text-[#fafafa] hover:no-underline px-4 py-4">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-[#A1A1AA] px-3">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
