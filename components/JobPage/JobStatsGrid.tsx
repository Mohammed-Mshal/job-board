import { IJob } from "@/types/job.types"
import { Briefcase, Calendar, Timer, Users } from "lucide-react"
import JobStatCard from "./JobStatCard"

interface JobStatsGridProps {
  job: IJob
  labels: {
    experience: string
    years: string
    jobType: string
    teamSize: string
    people: string
    posted: string
  }
  jobTypeLabel: string
  postedDate: string
}

export default function JobStatsGrid({
  job,
  labels,
  jobTypeLabel,
  postedDate,
}: JobStatsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <JobStatCard
        icon={Timer}
        label={labels.experience}
        value={
          <>
            {job.experience} {labels.years}
          </>
        }
      />
      <JobStatCard
        icon={Briefcase}
        label={labels.jobType}
        value={jobTypeLabel}
      />
      <JobStatCard
        icon={Users}
        label={labels.teamSize}
        value={
          <>
            {job.company?.teamSize?.min} - {job.company?.teamSize?.max}{" "}
            {labels.people}
          </>
        }
      />
      <JobStatCard icon={Calendar} label={labels.posted} value={postedDate} />
    </div>
  )
}
