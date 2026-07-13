import HeaderSection from "@/components/shared/HeaderSection/HeaderSection"
import { SlideUp } from "@/components/motion"
import { getTranslations } from "next-intl/server"
import { AboutHeroCms } from "@/types/cms.types"

export default async function AboutHero({ content }: { content?: AboutHeroCms }) {
  const t = await getTranslations("AboutPage.hero")

  return (
    <section className="pt-20 pb-8">
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center xl:max-w-7xl">
        <SlideUp whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <span className="rounded-full border border-[rgba(208,188,255,0.2)] bg-[rgba(208,188,255,0.1)] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#D0BCFF]">
            {content?.subtitle ?? t("subtitle")}
          </span>
        </SlideUp>
        <SlideUp delay={0.1} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
            {content?.title ?? t("title")}{" "}
            <span className="bg-gradient-to-r from-[#D0BCFF] to-[#A078FF] bg-clip-text text-transparent">
              {content?.titleHighlight ?? t("title-highlight")}
            </span>
          </h1>
        </SlideUp>
        <SlideUp delay={0.2} whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
          <p className="max-w-2xl text-base text-[#A1A1AA] lg:text-lg">
            {content?.description ?? t("description")}
          </p>
        </SlideUp>
      </div>
    </section>
  )
}
