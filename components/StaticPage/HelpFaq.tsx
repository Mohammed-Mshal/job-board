"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FaqItem {
  question: string
  answer: string
}

interface HelpFaqProps {
  items: FaqItem[]
}

export default function HelpFaq({ items }: HelpFaqProps) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`faq-${index}`}
          className="surface-card border px-6"
        >
          <AccordionTrigger className="text-base font-semibold text-[var(--foreground)] hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-body-sm pb-2">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
