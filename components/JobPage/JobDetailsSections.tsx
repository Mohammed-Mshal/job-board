import { IJob } from "@/types/job.types"
import { Gift } from "lucide-react"
import JobFaqSection from "./JobFaqSection"
import JobIconList from "./JobIconList"
import JobNumberedList from "./JobNumberedList"
import JobSectionCard from "./JobSectionCard"
import JobTagList from "./JobTagList"

interface JobDetailsSectionsProps {
  job: IJob
  labels: {
    requiredTechStack: string
    benefits: string
    hiringProcess: string
    faq: string
  }
}

export default function JobDetailsSections({ job, labels }: JobDetailsSectionsProps) {
  return (
    <>
      {job.requirements?.length > 0 && (
        <JobSectionCard title={labels.requiredTechStack} accent>
          <JobTagList items={job.requirements} />
        </JobSectionCard>
      )}

      {job.benefits?.length > 0 && (
        <JobSectionCard title={labels.benefits} accent>
          <JobIconList items={job.benefits} icon={Gift} />
        </JobSectionCard>
      )}

      {job.hiringProcess?.length > 0 && (
        <JobSectionCard title={labels.hiringProcess} accent>
          <JobNumberedList items={job.hiringProcess} />
        </JobSectionCard>
      )}

      {job.FAQ?.length > 0 && (
        <JobSectionCard title={labels.faq} accent>
          <JobFaqSection items={job.FAQ} />
        </JobSectionCard>
      )}
    </>
  )
}
