import { ProfilePageContent } from "@/components/ProfilePage"
import { noIndexMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations("ProfilePage.hero")
  return noIndexMetadata(locale, "/profile", t("title"))
}

export default function ProfilePage() {
  return <ProfilePageContent />
}
