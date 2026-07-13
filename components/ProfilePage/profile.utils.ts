import { USER_ROLES, UserRoleType } from "@/constants/roles"
import { Application } from "@/types/api.types"
import { ApplicationStatus, ApplicationStatusType } from "@/types/applications.types"
import { ProfileTab } from "./ProfileSidebar"

export function getTabsForRole(role: UserRoleType): ProfileTab[] {
  const base: ProfileTab[] = ["overview", "edit", "security"]

  if (role === USER_ROLES.USER) {
    return [...base, "applications", "saved"]
  }

  if (role === USER_ROLES.COMPANY) {
    return [...base, "jobs"]
  }

  return base
}

export function isTabAllowedForRole(tab: ProfileTab, role: UserRoleType): boolean {
  return getTabsForRole(role).includes(tab)
}

export function normalizeApplications(data: unknown): Application[] {
  if (Array.isArray(data)) {
    return data.map(normalizeApplication)
  }

  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  ) {
    return (data as { data: Application[] }).data.map(normalizeApplication)
  }

  return []
}

function normalizeApplication(application: Application): Application {
  return {
    ...application,
    _id: String(application._id),
    status: normalizeApplicationStatus(application.status),
    job: application.job
      ? {
          ...application.job,
          jobId: application.job.jobId ? String(application.job.jobId) : "",
        }
      : application.job,
  }
}

function normalizeApplicationStatus(status: ApplicationStatusType): ApplicationStatusType {
  if (Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
    return status
  }

  return ApplicationStatus.PENDING
}

export function getStatusStyle(
  status: ApplicationStatusType,
  styles: Record<ApplicationStatus, string>
): string {
  const normalized = normalizeApplicationStatus(status)
  return styles[normalized] ?? styles[ApplicationStatus.PENDING]
}

export function getApiErrorMessage(
  error: unknown,
  fallback: string
): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const data = error.response.data as { error?: string; errors?: Record<string, string[]> }
    if (data.error) return data.error

    if (data.errors) {
      const firstField = Object.keys(data.errors)[0]
      const firstMessage = firstField ? data.errors[firstField]?.[0] : undefined
      if (firstMessage) return firstMessage
    }
  }

  return fallback
}
