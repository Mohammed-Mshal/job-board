import HeaderSection from "@/components/shared/HeaderSection/HeaderSection"
import { StaggerContainer, StaggerItem } from "@/components/motion"
import { getTranslations } from "next-intl/server"
import { Heart, Shield, Sparkles, Users } from "lucide-react"
import { AboutValuesCms } from "@/types/cms.types"

const valueIcons = [Heart, Users, Shield, Sparkles]

export default async function AboutValuesSection({
  content,
}: {
  content?: AboutValuesCms
}) {
  const t = await getTranslations("AboutPage.values")

  const items = content?.items ?? [
    { key: "people-first", title: t("items.people-first.title"), description: t("items.people-first.description") },
    { key: "transparency", title: t("items.transparency.title"), description: t("items.transparency.description") },
    { key: "trust", title: t("items.trust.title"), description: t("items.trust.description") },
    { key: "innovation", title: t("items.innovation.title"), description: t("items.innovation.description") },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col items-center gap-12 px-4 xl:max-w-7xl">
        <HeaderSection
          title={content?.title ?? t("title")}
          description={content?.description ?? t("description")}
          headerDirection="center"
        />

        <StaggerContainer
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          viewport={{ amount: 0.2, once: true }}
        >
          {items.map((item, index) => {
            const Icon = valueIcons[index]
            return (
              <StaggerItem key={item.key}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-[rgba(73,68,84,0.1)] bg-[rgba(21,18,27,0.1)] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(208,188,255,0.1)]">
                    <Icon className="text-[#D0BCFF]" size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#fafafa]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">{item.description}</p>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
