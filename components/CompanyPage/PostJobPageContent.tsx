"use client"

import CompanyGate from "@/components/CompanyPage/CompanyGate"
import PostJobForm from "@/components/Forms/PostJobForm"
import { useTranslations } from "next-intl"

export default function PostJobPageContent() {
  const t = useTranslations("PostJobPage")

  return (
    <CompanyGate redirectTo="/login?callbackUrl=/post-job">
      <div className="page-stack pb-20">
        <section className="pt-20">
          <div className="page-container max-w-4xl">
            <span className="badge-subtitle mb-4 inline-flex">{t("subtitle")}</span>
            <h1 className="hero-title">{t("title")}</h1>
            <p className="hero-description mt-3 max-w-2xl">{t("description")}</p>
          </div>
        </section>
        <section className="page-container max-w-4xl">
          <PostJobForm />
        </section>
      </div>
    </CompanyGate>
  )
}
