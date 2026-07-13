import ButtonCopyLink from "@/components/buttons/ButtonCopyLink"
import ButtonShare from "@/components/buttons/ButtonShare"
import ApplyJobButton from "@/components/buttons/ApplyJobButton"
import SaveJobButton from "@/components/buttons/SaveJobButton"
import { IJob } from "@/types/job.types"
import JobInfoRow from "./JobInfoRow"
import JobSectionTitle from "./JobSectionTitle"

interface JobSidebarProps {
  job: IJob
  isAuthenticated?: boolean
  isSaved?: boolean
  hasApplied?: boolean
  labels: {
    apply: string
    save: string
    quickInformation: string
    jobType: string
    relocation: string
    visaSponsored: string
    yes: string
    no: string
    supported: string
    notSupported: string
  }
  jobTypeLabel: string
}

export default function JobSidebar({
  job,
  isAuthenticated = false,
  isSaved = false,
  hasApplied = false,
  labels,
  jobTypeLabel,
}: JobSidebarProps) {
  return (
    <aside className="xl:col-span-3 col-span-12 sticky top-32 flex flex-col gap-6 h-fit">
      <section className="bg-[#18181B] border-[#27272A] flex flex-col gap-6 p-6 rounded-[20px]">
        <div className="flex flex-col gap-2">
          <ApplyJobButton
            jobId={job.jobId}
            initialApplied={hasApplied}
            isAuthenticated={isAuthenticated}
          />
          <SaveJobButton
            jobId={job.jobId}
            initialSaved={isSaved}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div className="pt-6 border-t border-[#27272A] flex flex-col gap-4">
          <JobSectionTitle>{labels.quickInformation}</JobSectionTitle>
          <JobInfoRow label={labels.jobType} value={jobTypeLabel} />
          <JobInfoRow
            label={labels.relocation}
            value={job.relocation ? labels.yes : labels.no}
          />
          <JobInfoRow
            label={labels.visaSponsored}
            value={job.visaSponsored ? labels.supported : labels.notSupported}
          />
        </div>
      </section>

      <section className="bg-[#18181B] border-[#27272A] p-6 rounded-[20px]">
        <div className="flex justify-around gap-2">
          <ButtonShare jobTitle={job.title} />
          <ButtonCopyLink />
        </div>
      </section>
    </aside>
  )
}
