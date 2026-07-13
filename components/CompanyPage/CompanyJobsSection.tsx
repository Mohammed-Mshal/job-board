import JobCard from "@/components/JobCard/JobCard"
import { IJob } from "@/types/job.types"

interface CompanyJobsSectionProps {
  jobs: IJob[]
  labels: {
    title: string
    empty: string
  }
}

export default function CompanyJobsSection({
  jobs,
  labels,
}: CompanyJobsSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-[#fafafa]">{labels.title}</h2>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-[#27272A] bg-[#18181B] p-8 text-center text-[#A1A1AA]">
          {labels.empty}
        </div>
      )}
    </section>
  )
}
