import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { Application } from "@/models/applications.model";
import { Job } from "@/models/job.model";
import { USER_ROLES } from "@/constants/roles";
import { USER_STATUS } from "@/constants/userStatus";
import { authService } from "../auth/auth.services";
import { mediaService } from "../media/media.services";
import { applicationsRepository } from "./applications.repository";
import { HttpError } from "@/lib/httpError";
import { IApplicationDocument } from "@/models/applications.model";
import { jobsRepository } from "../jobs/jobs.repository";
import { ApplicationStatus, ApplicationStatusType } from "@/types/applications.types";
import { IMediaDocument } from "@/models/media.model";
import { IMedia } from "@/types/media.types";
import { verifySession } from "@/lib/auth";
import { authRepository } from "../auth/auth.repository";
import { formatZodErrorToRecord } from "@/lib/formatError";
import { applyForJobValidation } from "./applications.validation";

export const applicationsServices= { 
    applyForJob: async (jobId: string,  coverLetter: string, resume: File) => {
        const parsed = applyForJobValidation({ jobId, coverLetter });
        if (!parsed.success) {
            throw new HttpError(400, { errors: formatZodErrorToRecord(parsed.error) });
        }

        const job = await Job.findOne({ jobId: parsed.data.jobId });
        if (!job) {
            throw apiError(404, API_ERROR_CODES.JOB_NOT_FOUND);
        }
        const user = await authService.getUser();
        if (user.role !== USER_ROLES.USER) {
            throw apiError(403, API_ERROR_CODES.ONLY_JOB_SEEKERS_CAN_APPLY);
        }
        if ((user.status ?? USER_STATUS.ACTIVE) !== USER_STATUS.ACTIVE) {
            throw apiError(403, API_ERROR_CODES.ACCOUNT_SUSPENDED);
        }
        const existingApplication = await applicationsRepository.findApplicationByUserAndJob(
            user._id.toString(),
            job._id.toString()
        );
        if (existingApplication) {
            throw apiError(400, API_ERROR_CODES.ALREADY_APPLIED);
        }
        const resumeMedia = await mediaService.createMedia(resume, 'resume-files', 1024 * 1024 * 5, ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
        const application = await applicationsRepository.createApplication(job._id.toString(), user._id.toString(), parsed.data.coverLetter, resumeMedia);
        return {
            message: "Application submitted successfully",
            application,
        };
    },
    getApplicationStatus: async (jobId: string) => {
        const session = await verifySession();
        if (!session) {
            return { applied: false, isAuthenticated: false };
        }

        const user = await authRepository.findUserById(session.userId);
        if (!user || user.role !== USER_ROLES.USER) {
            return { applied: false, isAuthenticated: true };
        }

        const job = await Job.findOne({ jobId }).select("_id").lean();
        if (!job) {
            return { applied: false, isAuthenticated: true };
        }

        const application = await applicationsRepository.findApplicationByUserAndJob(
            user._id.toString(),
            String(job._id)
        );

        return {
            applied: !!application,
            isAuthenticated: true,
        };
    },
    getApplicationsByUserId: async () => {
        const user = await authService.getUser();
        const applications = await applicationsRepository.getApplicationsByUserId(user._id.toString());
        return applications;
    },
    getApplicationById: async (id: string) => {
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw apiError(404, API_ERROR_CODES.APPLICATION_NOT_FOUND);
        }
        if (application.user._id.toString() !== user._id.toString() && application.job.company._id.toString() !== user._id.toString()) {
            throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
        }
        return application;
    },
    getApplicationsByJobId: async (jobId: string) => {
        const company = await authService.getCompanyUser();
        const job = await jobsRepository.getJobById(jobId);
        if (!job) {
            throw apiError(404, API_ERROR_CODES.JOB_NOT_FOUND);
        }
        if (job.company._id.toString() !== company._id.toString()) {
            throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
        }
        const applications = await applicationsRepository.getApplicationsByJobId(job._id.toString());
        return applications;
    },
    updateApplication: async (id: string, body: { coverLetter?: string; resume?: File }) => {
        const coverLetter = body?.coverLetter;
        const resume = body?.resume;
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw apiError(404, API_ERROR_CODES.APPLICATION_NOT_FOUND);
        }
        if (application.user._id.toString() !== user._id.toString()) {
            throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
        }
        if (resume) {
            const newResume = await mediaService.createMedia(resume as unknown as File, 'resume-files', 1024 * 1024 * 5, ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
            await mediaService.deleteMedia(application.resume as unknown as IMedia).catch((err) => console.error(err));
            application.resume = newResume;
        }
        if (coverLetter) {
            application.coverLetter = coverLetter;
        }
        const updatedApplication = await applicationsRepository.updateApplication(id, { coverLetter, resume: application.resume as unknown as IMediaDocument });
        if (!updatedApplication) {
            throw apiError(500, API_ERROR_CODES.FAILED_TO_UPDATE_APPLICATION);
        }
        return { message: "Application updated successfully", application: updatedApplication };
    },
    deleteApplication: async (id: string) => {
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw apiError(404, API_ERROR_CODES.APPLICATION_NOT_FOUND);
        }
        if (application.user._id.toString() !== user._id.toString() && application.job.company._id.toString() !== user._id.toString()) {
            throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
        }       
        if (application.resume) {
            await mediaService.deleteMedia(application.resume).catch((err) => console.error(err));
        }
        const deletedApplication = await applicationsRepository.deleteApplication(id);
        if (!deletedApplication) {
            throw apiError(500, API_ERROR_CODES.FAILED_TO_DELETE_APPLICATION);
        }
        return { message: "Application deleted successfully" };
    },
    updateApplicationStatus: async (id: string, body: { status?: ApplicationStatusType }) => {
        const status = body?.status;
        if (!status || !Object.values(ApplicationStatus).includes(status)) {
            throw apiError(400, API_ERROR_CODES.INVALID_APPLICATION_STATUS);
        }
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw apiError(404, API_ERROR_CODES.APPLICATION_NOT_FOUND);
        }
        if (application.job.company._id.toString() !== user._id.toString()) {
            throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
        }
        const updatedApplication = await applicationsRepository.updateApplication(id, { status });
        if (!updatedApplication) {
            throw apiError(500, API_ERROR_CODES.FAILED_TO_UPDATE_APPLICATION_STATUS);
        }
        return { message: "Application status updated successfully", application: updatedApplication };
    }

}