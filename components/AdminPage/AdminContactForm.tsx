"use client"

import { adminService } from "@/services/admin.service"
import { CmsLocale, ContactCmsContent } from "@/types/cms.types"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AdminField } from "./AdminField"
import { getApiErrorMessage } from "../ProfilePage/profile.utils"

interface AdminContactFormProps {
  locale: CmsLocale
  initialData: ContactCmsContent
}

export default function AdminContactForm({
  locale,
  initialData,
}: AdminContactFormProps) {
  const t = useTranslations("AdminPage.contact")
  const [form, setForm] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await adminService.updateCmsSection(locale, "contact", form)
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
      <div className="grid max-w-3xl gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("hero")}</h3>
          <AdminField label={t("subtitle")} id="heroSubtitle" value={form.hero.subtitle} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, subtitle: v } }))} />
          <AdminField label={t("section-title")} id="heroTitle" value={form.hero.title} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, title: v } }))} />
          <AdminField label={t("title-highlight")} id="heroHighlight" value={form.hero.titleHighlight} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, titleHighlight: v } }))} />
          <AdminField label={t("description")} id="heroDescription" value={form.hero.description} onChange={(v) => setForm((p) => ({ ...p, hero: { ...p.hero, description: v } }))} multiline />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D0BCFF]">{t("info")}</h3>
          <AdminField label={t("info-title")} id="infoTitle" value={form.info.title} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, title: v } }))} />
          <AdminField label={t("email-title")} id="emailTitle" value={form.info.emailTitle} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, emailTitle: v } }))} />
          <AdminField label={t("email-value")} id="emailValue" value={form.info.emailValue} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, emailValue: v } }))} />
          <AdminField label={t("location-title")} id="locationTitle" value={form.info.locationTitle} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, locationTitle: v } }))} />
          <AdminField label={t("location-value")} id="locationValue" value={form.info.locationValue} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, locationValue: v } }))} />
          <AdminField label={t("hours-title")} id="hoursTitle" value={form.info.hoursTitle} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, hoursTitle: v } }))} />
          <AdminField label={t("hours-value")} id="hoursValue" value={form.info.hoursValue} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, hoursValue: v } }))} />
          <AdminField label={t("support-title")} id="supportTitle" value={form.info.supportTitle} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, supportTitle: v } }))} />
          <AdminField label={t("support-description")} id="supportDescription" value={form.info.supportDescription} onChange={(v) => setForm((p) => ({ ...p, info: { ...p.info, supportDescription: v } }))} multiline />
        </div>

        <button type="button" onClick={() => void handleSave()} disabled={isSaving} className="base-btn btn-primary flex w-fit items-center gap-2 px-8">
          {isSaving && <Loader2 className="size-4 animate-spin" />}
          {isSaving ? t("saving") : t("save")}
        </button>
      </div>
    </section>
  )
}
