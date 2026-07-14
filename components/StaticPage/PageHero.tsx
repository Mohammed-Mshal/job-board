import { SlideUp } from "@/components/motion"

interface PageHeroProps {
  subtitle: string
  title: string
  titleHighlight?: string
  description: string
}

export default function PageHero({
  subtitle,
  title,
  titleHighlight,
  description,
}: PageHeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <span className="badge-subtitle">{subtitle}</span>
        </SlideUp>
        <SlideUp delay={0.1} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <h1 className="hero-title">
            {title}{" "}
            {titleHighlight ? (
              <span className="hero-title-accent">{titleHighlight}</span>
            ) : null}
          </h1>
        </SlideUp>
        <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <p className="hero-description">{description}</p>
        </SlideUp>
      </div>
    </section>
  )
}
