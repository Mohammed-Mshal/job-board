import { SlideUp } from "@/components/motion"
import { getTranslations } from "next-intl/server"
import { ContactHeroCms } from "@/types/cms.types"

export default async function ContactHero({ content }: { content?: ContactHeroCms }) {
  const t = await getTranslations("ContactPage.hero")

  return (
    <section className="hero-section">
      <div className="hero-inner">
        <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <span className="badge-subtitle">
            {content?.subtitle ?? t("subtitle")}
          </span>
        </SlideUp>
        <SlideUp delay={0.1} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <h1 className="hero-title">
            {content?.title ?? t("title")}{" "}
            <span className="hero-title-accent">
              {content?.titleHighlight ?? t("title-highlight")}
            </span>
          </h1>
        </SlideUp>
        <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <p className="hero-description">
            {content?.description ?? t("description")}
          </p>
        </SlideUp>
      </div>
    </section>
  )
}
