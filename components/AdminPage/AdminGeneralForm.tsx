"use client"

import { adminService } from "@/services/admin.service"
import { CmsLocale, GeneralCmsContent } from "@/types/cms.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AdminField } from "./AdminField"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminGeneralFormProps {
  locale: CmsLocale
  initialData: GeneralCmsContent
}

export default function AdminGeneralForm({
  locale,
  initialData,
}: AdminGeneralFormProps) {
  const t = useTranslations("AdminPage.general")
  const [form, setForm] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const update = (key: keyof GeneralCmsContent, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await adminService.updateCmsSection(locale, "general", form)
      toast.success(response.message || t("success"))
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("error")))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-semibold text-[#fafafa]">{t("title")}</h2>
      <div className="grid max-w-3xl gap-5">
        <AdminField id="siteName" label={t("site-name")} value={form.siteName} onChange={(v) => update("siteName", v)} />
        <AdminField id="siteDescription" label={t("site-description")} value={form.siteDescription} onChange={(v) => update("siteDescription", v)} multiline />
        <AdminField id="supportEmail" label={t("support-email")} value={form.supportEmail} onChange={(v) => update("supportEmail", v)} type="email" />
        <AdminField id="footerTagline" label={t("footer-tagline")} value={form.footerTagline} onChange={(v) => update("footerTagline", v)} />
        <AdminField id="footerCopyright" label={t("footer-copyright")} value={form.footerCopyright} onChange={(v) => update("footerCopyright", v)} />
        <button type="button" onClick={() => void handleSave()} disabled={isSaving} className="base-btn btn-primary flex w-fit items-center gap-2 px-8">
          {isSaving && <Loader2 className="size-4 animate-spin" />}
          {isSaving ? t("saving") : t("save")}
        </button>
      </div>
    </section>
  )
}
