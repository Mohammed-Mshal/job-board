import { Application, IApplicationDocument } from "@/models/applications.model";
import { IMediaDocument } from "@/models/media.model";

export const applicationsRepository = {
    createApplication: async (jobId: string, userId: string, coverLetter: string, resumeMediaId: IMediaDocument) => {
        return await Application.create({ job: jobId, user: userId, coverLetter, resume: resumeMediaId._id });
    },

    findApplicationByUserAndJob: async (userId: string, jobObjectId: string) => {
        return await Application.findOne({ user: userId, job: jobObjectId }).lean();
    },

    getApplicationById: async (id: string) => {
        return await Application.findById(id)
            .populate({ path: "user", select: "-password" })
            .populate({ path: "job", populate: { path: "company", select: "-password" } })
            .populate({ path: "resume", select: "-mediaId" });
    },
    getApplicationsByJobId: async (jobId: string) => {
        return await Application.find({ job: jobId }).populate({ path: "user", select: "-password" }).populate({ path: "resume", select: "-mediaId" });
    },
    getApplicationsByUserId: async (userId: string) => {
        return await Application.find({ user: userId })
            .populate({
                path: "job",
                populate: { path: "company", select: "name profileImage userId" },
            })
            .populate({ path: "resume", select: "-mediaId" })
            .sort({ createdAt: -1 });
    },
    updateApplication: async (id: string, application: Partial<IApplicationDocument>) => {
        return await Application.findByIdAndUpdate(id, application, { new: true })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "job", populate: { path: "company", select: "-password" } })
            .populate({ path: "resume", select: "-mediaId" });
    },
    deleteApplication: async (id: string) => {
        return await Application.findByIdAndDelete(id);
    }
}