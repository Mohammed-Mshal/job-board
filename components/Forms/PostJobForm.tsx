"use client"

import {
  postJobFormSchema,
  sanitizePostJobPayload,
  type PostJobFormValues,
} from "@/features/jobs/jobs.client.validation"
import { jobService } from "@/services/job.service"
import { JobType, WorkModel } from "@/types/job.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const defaultValues: PostJobFormValues = {
  title: "",
  description: "",
  location: "",
  experience: 0,
  jobType: JobType.FULL_TIME,
  workModel: WorkModel.REMOTE,
  relocation: false,
  visaSponsored: false,
  salary: {
    min: 0,
    max: 0,
    salaryPeriod: "year",
    currency: "USD",
  },
  requirements: [""],
  coreResponsibilities: [""],
  qualifications: [""],
  benefits: [""],
  hiringProcess: [""],
  FAQ: [{ question: "", answer: "" }],
}

function getErrorMessage(
  error: unknown,
  fallback: string
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as {
      error?: string
      errors?: Record<string, string[]>
    }
    if (data?.error) return data.error
    if (data?.errors) {
      const first = Object.values(data.errors).flat()[0]
      if (first) return first
    }
  }
  return fallback
}

interface StringListFieldProps {
  label: string
  values: string[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, value: string) => void
  addLabel: string
  removeLabel: string
  placeholder: string
}

function StringListField({
  label,
  values,
  onAdd,
  onRemove,
  onChange,
  addLabel,
  removeLabel,
  placeholder,
}: StringListFieldProps) {
  return (
    <div className="form-field">
      <Label>{label}</Label>
      <div className="flex flex-col gap-3">
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className="flex gap-2">
            <Input
              value={values[index] ?? ""}
              onChange={(event) => onChange(index, event.target.value)}
              placeholder={placeholder}
              className="border-[#27272A] bg-[#0f0f11]"
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={removeLabel}
                className="base-btn btn-secondary shrink-0 px-3"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="base-btn btn-secondary inline-flex w-fit items-center gap-2 px-4 py-2 text-sm"
        >
          <Plus className="size-4" />
          {addLabel}
        </button>
      </div>
    </div>
  )
}

export default function PostJobForm() {
  const t = useTranslations("PostJobPage.form")
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostJobFormValues>({
    resolver: zodResolver(postJobFormSchema),
    defaultValues,
  })

  const faq = useFieldArray({ control, name: "FAQ" })

  const requirementValues = watch("requirements")
  const responsibilityValues = watch("coreResponsibilities")
  const qualificationValues = watch("qualifications")
  const benefitValues = watch("benefits")
  const hiringProcessValues = watch("hiringProcess")

  const updateStringList = (
    key:
      | "requirements"
      | "coreResponsibilities"
      | "qualifications"
      | "benefits"
      | "hiringProcess",
    index: number,
    value: string
  ) => {
    const current = watch(key)
    setValue(
      key,
      current.map((item, itemIndex) => (itemIndex === index ? value : item))
    )
  }

  const addStringListItem = (
    key:
      | "requirements"
      | "coreResponsibilities"
      | "qualifications"
      | "benefits"
      | "hiringProcess"
  ) => {
    setValue(key, [...watch(key), ""])
  }

  const removeStringListItem = (
    key:
      | "requirements"
      | "coreResponsibilities"
      | "qualifications"
      | "benefits"
      | "hiringProcess",
    index: number
  ) => {
    const current = watch(key)
    if (current.length <= 1) return
    setValue(
      key,
      current.filter((_, itemIndex) => itemIndex !== index)
    )
  }

  const onSubmit = async (values: PostJobFormValues) => {
    const payload = sanitizePostJobPayload(values)
    const parsed = postJobFormSchema.safeParse(payload)

    if (!parsed.success) {
      toast.error(t("validation-error"))
      return
    }

    try {
      const job = await jobService.createJob(parsed.data)
      toast.success(t("success"))
      router.push(`/jobs/${job.jobId}`)
      router.refresh()
    } catch (error) {
      toast.error(getErrorMessage(error, t("error")))
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
      <section className="surface-card space-y-5 p-6">
        <h2 className="text-lg font-semibold text-[#fafafa]">{t("sections.basic")}</h2>

        <div className="form-field">
          <Label htmlFor="title">{t("title")}</Label>
          <Input id="title" {...register("title")} className="border-[#27272A] bg-[#0f0f11]" />
          {errors.title && <p className="form-error">{t("title-error")}</p>}
        </div>

        <div className="form-field">
          <Label htmlFor="description">{t("description")}</Label>
          <Textarea
            id="description"
            rows={5}
            {...register("description")}
            className="border-[#27272A] bg-[#0f0f11]"
          />
          {errors.description && <p className="form-error">{t("description-error")}</p>}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="form-field">
            <Label htmlFor="location">{t("location")}</Label>
            <Input id="location" {...register("location")} className="border-[#27272A] bg-[#0f0f11]" />
            {errors.location && <p className="form-error">{t("location-error")}</p>}
          </div>
          <div className="form-field">
            <Label htmlFor="experience">{t("experience")}</Label>
            <Input
              id="experience"
              type="number"
              min={0}
              {...register("experience", { valueAsNumber: true })}
              className="border-[#27272A] bg-[#0f0f11]"
            />
            {errors.experience && <p className="form-error">{t("experience-error")}</p>}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="form-field">
            <Label htmlFor="jobType">{t("job-type")}</Label>
            <select
              id="jobType"
              {...register("jobType")}
              className="h-11 w-full rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"
            >
              {Object.values(JobType).map((value) => (
                <option key={value} value={value}>
                  {t(`job-types.${value}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <Label htmlFor="workModel">{t("work-model")}</Label>
            <select
              id="workModel"
              {...register("workModel")}
              className="h-11 w-full rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"
            >
              {Object.values(WorkModel).map((value) => (
                <option key={value} value={value}>
                  {t(`work-models.${value}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-[#fafafa]">
            <input type="checkbox" {...register("relocation")} className="size-4 accent-[#D0BCFF]" />
            {t("relocation")}
          </label>
          <label className="flex items-center gap-2 text-sm text-[#fafafa]">
            <input type="checkbox" {...register("visaSponsored")} className="size-4 accent-[#D0BCFF]" />
            {t("visa-sponsored")}
          </label>
        </div>
      </section>

      <section className="surface-card space-y-5 p-6">
        <h2 className="text-lg font-semibold text-[#fafafa]">{t("sections.salary")}</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="form-field">
            <Label htmlFor="salaryMin">{t("salary-min")}</Label>
            <Input
              id="salaryMin"
              type="number"
              min={0}
              {...register("salary.min", { valueAsNumber: true })}
              className="border-[#27272A] bg-[#0f0f11]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="salaryMax">{t("salary-max")}</Label>
            <Input
              id="salaryMax"
              type="number"
              min={0}
              {...register("salary.max", { valueAsNumber: true })}
              className="border-[#27272A] bg-[#0f0f11]"
            />
          </div>
          <div className="form-field">
            <Label htmlFor="salaryPeriod">{t("salary-period")}</Label>
            <select
              id="salaryPeriod"
              {...register("salary.salaryPeriod")}
              className="h-11 w-full rounded-xl border border-[#27272A] bg-[#0f0f11] px-4 text-sm text-[#fafafa] outline-none focus:border-[#D0BCFF]"
            >
              <option value="year">{t("salary-year")}</option>
              <option value="month">{t("salary-month")}</option>
            </select>
          </div>
          <div className="form-field">
            <Label htmlFor="currency">{t("currency")}</Label>
            <Input
              id="currency"
              {...register("salary.currency")}
              className="border-[#27272A] bg-[#0f0f11]"
            />
          </div>
        </div>
        {errors.salary?.max && <p className="form-error">{t("salary-range-error")}</p>}
      </section>

      <section className="surface-card space-y-5 p-6">
        <h2 className="text-lg font-semibold text-[#fafafa]">{t("sections.details")}</h2>

        <StringListField
          label={t("requirements")}
          values={requirementValues}
          onAdd={() => addStringListItem("requirements")}
          onRemove={(index) => removeStringListItem("requirements", index)}
          onChange={(index, value) => updateStringList("requirements", index, value)}
          addLabel={t("add-item")}
          removeLabel={t("remove-item")}
          placeholder={t("requirements-placeholder")}
        />

        <StringListField
          label={t("responsibilities")}
          values={responsibilityValues}
          onAdd={() => addStringListItem("coreResponsibilities")}
          onRemove={(index) => removeStringListItem("coreResponsibilities", index)}
          onChange={(index, value) => updateStringList("coreResponsibilities", index, value)}
          addLabel={t("add-item")}
          removeLabel={t("remove-item")}
          placeholder={t("responsibilities-placeholder")}
        />

        <StringListField
          label={t("qualifications")}
          values={qualificationValues}
          onAdd={() => addStringListItem("qualifications")}
          onRemove={(index) => removeStringListItem("qualifications", index)}
          onChange={(index, value) => updateStringList("qualifications", index, value)}
          addLabel={t("add-item")}
          removeLabel={t("remove-item")}
          placeholder={t("qualifications-placeholder")}
        />

        <StringListField
          label={t("benefits")}
          values={benefitValues}
          onAdd={() => addStringListItem("benefits")}
          onRemove={(index) => removeStringListItem("benefits", index)}
          onChange={(index, value) => updateStringList("benefits", index, value)}
          addLabel={t("add-item")}
          removeLabel={t("remove-item")}
          placeholder={t("benefits-placeholder")}
        />

        <StringListField
          label={t("hiring-process")}
          values={hiringProcessValues}
          onAdd={() => addStringListItem("hiringProcess")}
          onRemove={(index) => removeStringListItem("hiringProcess", index)}
          onChange={(index, value) => updateStringList("hiringProcess", index, value)}
          addLabel={t("add-item")}
          removeLabel={t("remove-item")}
          placeholder={t("hiring-process-placeholder")}
        />
      </section>

      <section className="surface-card space-y-5 p-6">
        <h2 className="text-lg font-semibold text-[#fafafa]">{t("sections.faq")}</h2>
        <div className="flex flex-col gap-4">
          {faq.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-[#27272A] bg-[#0f0f11] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[#fafafa]">
                  {t("faq-item", { number: index + 1 })}
                </p>
                {faq.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => faq.remove(index)}
                    aria-label={t("remove-item")}
                    className="base-btn btn-secondary px-3 py-2"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
              <div className="grid gap-4">
                <div className="form-field">
                  <Label htmlFor={`faq-question-${index}`}>{t("faq-question")}</Label>
                  <Input
                    id={`faq-question-${index}`}
                    {...register(`FAQ.${index}.question`)}
                    className="border-[#27272A] bg-[#18181B]"
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor={`faq-answer-${index}`}>{t("faq-answer")}</Label>
                  <Textarea
                    id={`faq-answer-${index}`}
                    rows={3}
                    {...register(`FAQ.${index}.answer`)}
                    className="border-[#27272A] bg-[#18181B]"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => faq.append({ question: "", answer: "" })}
            className="base-btn btn-secondary inline-flex w-fit items-center gap-2 px-4 py-2 text-sm"
          >
            <Plus className="size-4" />
            {t("add-faq")}
          </button>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="base-btn btn-primary inline-flex items-center gap-2 px-8 py-3"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  )
}
