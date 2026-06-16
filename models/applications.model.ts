import mongoose, { Schema } from "mongoose";
import { ApplicationStatus, ApplicationStatusType } from "@/types/applications.types";
import { IJobDocument } from "./job.model";
import { IUserDocument } from "./user.model";
import { IMediaDocument } from "./media.model";

export interface IApplicationDocument extends Document {
    job: IJobDocument;
    user: IUserDocument;
    status: ApplicationStatusType;
    coverLetter: string;
    resume: IMediaDocument;
}

export const applicationsSchema=new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(ApplicationStatus),
        default: ApplicationStatus.PENDING as ApplicationStatusType,
    },
    coverLetter: {
        type: String,
    },
    resume: {
        type: Schema.Types.ObjectId,
        ref: "Media",
        required: true,
    },
},{timestamps: true});
applicationsSchema.index({ job: 1, user: 1 }, { unique: true });

export const Application = mongoose.models.Application || mongoose.model<IApplicationDocument>("Application", applicationsSchema);