import { AdminDashboard } from "@/components/AdminPage"
import { noIndexMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return noIndexMetadata(locale, "/admin", "Admin")
}

export default function AdminPage() {
  return <AdminDashboard />
}
