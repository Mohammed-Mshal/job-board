import { PopIn } from "@/components/motion"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { AboutCtaCms } from "@/types/cms.types"

export default async function AboutCtaSection({
  content,
}: {
  content?: AboutCtaCms
}) {
  const t = await getTranslations("AboutPage.cta")

  return (
    <section className="pb-20 pt-8">
      <div className="container mx-auto px-4 xl:max-w-7xl">
        <div className="flex flex-col items-center gap-6 rounded-[20px] border border-[#27272A] bg-[#18181B] px-6 py-12 text-center md:px-12">
          <h2 className="text-2xl font-bold text-[#fafafa] lg:text-3xl">
            {content?.title ?? t("title")}
          </h2>
          <p className="max-w-xl text-[#A1A1AA]">{content?.description ?? t("description")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PopIn whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
              <Link href="/jobs" className="base-btn btn-primary">
                {content?.browseJobs ?? t("browse-jobs")}
              </Link>
            </PopIn>
            <PopIn whileInView="animate" initial="initial" viewport={{ amount: 0.5, once: true }}>
              <Link href="/companies" className="base-btn btn-secondary">
                {content?.browseCompanies ?? t("browse-companies")}
              </Link>
            </PopIn>
          </div>
        </div>
      </div>
    </section>
  )
}
