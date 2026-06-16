import { Job } from "@/models/job.model";
import { authService } from "../auth/auth.services";
import { mediaService } from "../media/media.services";
import { applicationsRepository } from "./applications.repository";
import { HttpError } from "@/lib/httpError";
import { IApplicationDocument } from "@/models/applications.model";
import { jobsRepository } from "../jobs/jobs.repository";
import { ApplicationStatus, ApplicationStatusType } from "@/types/applications.types";
import { IMediaDocument } from "@/models/media.model";
import { IMedia } from "@/types/media.types";

export const applicationsServices= { 
    applyForJob: async (jobId: string,  coverLetter: string, resume: File) => {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new HttpError(404, { error: "Job not found" });
        }
        const user = await authService.getUser();
        const resumeMedia = await mediaService.createMedia(resume, 'resume-files', 1024 * 1024 * 5, ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
        const application = await applicationsRepository.createApplication(jobId, user._id.toString(), coverLetter, resumeMedia);
        return application;
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
            throw new HttpError(404, { error: "Application not found" });
        }
        if (application.user._id.toString() !== user._id.toString() && application.job.company._id.toString() !== user._id.toString()) {
            throw new HttpError(401, { error: "Unauthorized" });
        }
        return application;
    },
    getApplicationsByJobId: async (jobId: string) => {
        const company = await authService.getCompanyUser();
        const job = await jobsRepository.getJobById(jobId);
        if (!job) {
            throw new HttpError(404, { error: "Job not found" });
        }
        if (job.company._id.toString() !== company._id.toString()) {
            throw new HttpError(401, { error: "Unauthorized" });
        }
        const applications = await applicationsRepository.getApplicationsByJobId(jobId);
        return applications;
    },
    updateApplication: async (id: string, body: { coverLetter?: string; resume?: File }) => {
        const coverLetter = body?.coverLetter;
        const resume = body?.resume;
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw new HttpError(404, { error: "Application not found" });
        }
        if (application.user._id.toString() !== user._id.toString()) {
            throw new HttpError(401, { error: "Unauthorized" });
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
            throw new HttpError(500, { error: "Failed to update application" });
        }
        return { message: "Application updated successfully", application: updatedApplication };
    },
    deleteApplication: async (id: string) => {
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw new HttpError(404, { error: "Application not found" });
        }
        if (application.user._id.toString() !== user._id.toString() && application.job.company._id.toString() !== user._id.toString()) {
            throw new HttpError(401, { error: "Unauthorized" });
        }       
        if (application.resume) {
            await mediaService.deleteMedia(application.resume).catch((err) => console.error(err));
        }
        const deletedApplication = await applicationsRepository.deleteApplication(id);
        if (!deletedApplication) {
            throw new HttpError(500, { error: "Failed to delete application" });
        }
        return { message: "Application deleted successfully" };
    },
    updateApplicationStatus: async (id: string, body: { status?: ApplicationStatusType }) => {
        const status = body?.status;
        if (!status || !Object.values(ApplicationStatus).includes(status)) {
            throw new HttpError(400, { error: "Invalid application status" });
        }
        const user = await authService.getUser();
        const application = await applicationsRepository.getApplicationById(id);
        if (!application) {
            throw new HttpError(404, { error: "Application not found" });
        }
        if (application.job.company._id.toString() !== user._id.toString()) {
            throw new HttpError(401, { error: "Unauthorized" });
        }
        const updatedApplication = await applicationsRepository.updateApplication(id, { status });
        if (!updatedApplication) {
            throw new HttpError(500, { error: "Failed to update application status" });
        }
        return { message: "Application status updated successfully", application: updatedApplication };
    }

}