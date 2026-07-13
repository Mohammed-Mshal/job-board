import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { USER_ROLES } from "@/constants/roles";
import { authService } from "../auth/auth.services";
import { jobsRepository } from "../jobs/jobs.repository";
import { savedJobsRepository } from "./saved-jobs.repository";
import { HttpError } from "@/lib/httpError";
import { verifySession } from "@/lib/auth";

export const savedJobsService = {
  toggleSaveJob: async (jobId: string) => {
    const user = await authService.getUser();

    if (user.role !== USER_ROLES.USER) {
      throw apiError(403, API_ERROR_CODES.ONLY_JOB_SEEKERS_CAN_SAVE);
    }

    const job = await jobsRepository.getJobById(jobId);
    if (!job) {
      throw apiError(404, API_ERROR_CODES.JOB_NOT_FOUND);
    }

    const userWithSavedJobs = await savedJobsRepository.findUserWithSavedJobs(
      user.userId
    );
    const isSaved = userWithSavedJobs
      ? savedJobsRepository.isJobSaved(userWithSavedJobs, jobId)
      : false;

    if (isSaved) {
      await savedJobsRepository.removeSavedJob(user.userId, jobId);
      return { saved: false, message: "Job removed from saved jobs" };
    }

    await savedJobsRepository.addSavedJob(user.userId, jobId);
    return { saved: true, message: "Job saved successfully" };
  },

  getSaveStatus: async (jobId: string) => {
    const session = await verifySession();
    if (!session) {
      return { saved: false, isAuthenticated: false };
    }

    const [user, job] = await Promise.all([
      savedJobsRepository.findUserWithSavedJobs(session.userId),
      jobsRepository.getJobById(jobId),
    ]);

    if (!user || !job) {
      return { saved: false, isAuthenticated: true };
    }

    return {
      saved: savedJobsRepository.isJobSaved(user, jobId),
      isAuthenticated: true,
    };
  },

  getSavedJobs: async () => {
    const user = await authService.getUser();

    if (user.role !== USER_ROLES.USER) {
      throw apiError(403, API_ERROR_CODES.ONLY_JOB_SEEKERS_CAN_VIEW_SAVED);
    }

    const savedJobIds = user.savedJobs ?? [];
    if (savedJobIds.length === 0) {
      return { jobs: [] };
    }

    const { Job } = await import("@/models/job.model");
    const jobs = await Job.find({ jobId: { $in: savedJobIds } })
      .populate({
        path: "company",
        select: "-password",
        populate: "profileImage",
      })
      .sort({ createdAt: -1 })
      .lean();

    return { jobs };
  },
};
