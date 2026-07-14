interface PageSectionProps {
  title: string
  paragraphs: string[]
}

export default function PageSection({ title, paragraphs }: PageSectionProps) {
  return (
    <section className="surface-card space-y-4">
      <h2 className="heading-section mb-0">{title}</h2>
      <div className="space-y-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-body-sm">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
