import { IJob } from "@/types/job.types"
import { Check, Zap } from "lucide-react"
import JobIconList from "./JobIconList"
import JobSectionTitle from "./JobSectionTitle"

interface JobAboutSectionProps {
  job: IJob
  labels: {
    aboutTheRole: string
    coreResponsibilities: string
    qualificationsRequired: string
  }
}

export default function JobAboutSection({ job, labels }: JobAboutSectionProps) {
  return (
    <section className="bg-[#18181B] border-[#27272A] border p-6 rounded-[20px] flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <JobSectionTitle>{labels.aboutTheRole}</JobSectionTitle>
        <p className="text-[#A1A1AA] leading-relaxed">{job.description}</p>
      </div>

      {job.coreResponsibilities?.length > 0 && (
        <div className="flex flex-col gap-4">
          <JobSectionTitle accent>{labels.coreResponsibilities}</JobSectionTitle>
          <JobIconList
            items={job.coreResponsibilities}
            icon={Check}
            iconClassName="border rounded-full p-0.5"
          />
        </div>
      )}

      {job.qualifications?.length > 0 && (
        <div className="flex flex-col gap-4">
          <JobSectionTitle accent>{labels.qualificationsRequired}</JobSectionTitle>
          <JobIconList items={job.qualifications} icon={Zap} />
        </div>
      )}
    </section>
  )
}
