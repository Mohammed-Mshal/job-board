"use client"

import HeaderSection from "@/components/shared/HeaderSection/HeaderSection"
import { HomeSectionTitleCms } from "@/types/cms.types"
import { ITestimonial } from "@/types/testimonial.types"
import { ChevronLeft, ChevronRight, MessageSquarePlus } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import TestimonialsSlider from "./TestimonialsSlider"
import AddTestimonialModal from "./AddTestimonialModal"

interface TestimonialsClientProps {
  sectionContent?: HomeSectionTitleCms & { subtitle: string }
  testimonials: ITestimonial[]
}

export default function TestimonialsClient({
  sectionContent,
  testimonials,
}: TestimonialsClientProps) {
  const t = useTranslations("TestimonialsSection")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddReview = () => {
    if (!isAuthenticated || !user) {
      router.push(`/login?callbackUrl=${pathname}`)
      return
    }
    setModalOpen(true)
  }

  return (
    <>
      <div className="testimonials py-12 bg-[rgba(29,26,35,0.30)]">
        <div className="container xl:max-w-7xl mx-auto px-4 py-2 flex items-center justify-between lg:gap-12 gap-8 flex-col lg:flex-row">
          <div className="left-side flex flex-col gap-4 w-full lg:w-auto">
            <HeaderSection
              title={sectionContent?.title ?? t("title")}
              subtitle={sectionContent?.subtitle ?? t("subtitle")}
              description={sectionContent?.description ?? t("description")}
              headerDirection="left"
            />
            <div className="flex flex-wrap items-center gap-4">
              <div className="testimonials-nav-buttons flex items-center gap-4">
                <button
                  className="testimonials-nav-button testimonials-slider-prev cursor-pointer border border-[#4944544d] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:bg-[#4944544d] transition-all duration-300"
                  type="button"
                  title={t("prev")}
                >
                  {locale === "ar" ? (
                    <ChevronRight className="w-full h-full object-contain" />
                  ) : (
                    <ChevronLeft className="w-full h-full object-contain" />
                  )}
                </button>
                <button
                  className="testimonials-nav-button testimonials-slider-next cursor-pointer border border-[#4944544d] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:bg-[#4944544d] transition-all duration-300"
                  type="button"
                  title={t("next")}
                >
                  {locale === "ar" ? (
                    <ChevronLeft className="w-full h-full object-contain" />
                  ) : (
                    <ChevronRight className="w-full h-full object-contain" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddReview}
                className="base-btn btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <MessageSquarePlus className="size-4" />
                {t("add-review")}
              </button>
            </div>
          </div>
          <div className="right-side w-full min-w-0 max-w-full lg:max-w-lg">
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </div>
      </div>

      {modalOpen && user && (
        <AddTestimonialModal
          user={user}
          onClose={() => setModalOpen(false)}
          onSuccess={() => router.refresh()}
        />
      )}
    </>
  )
}
