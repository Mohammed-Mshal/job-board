import PostJobPageContent from "@/components/CompanyPage/PostJobPageContent"
import { noIndexMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("SEO")
  return noIndexMetadata(locale, "/post-job", t("post-job-title"))
}

export default function PostJobPage() {
  return <PostJobPageContent />
}
