import mongoose, { Document, Schema } from "mongoose";
import { JobStatus, JobStatusType } from "@/types/job.types";

export interface IJobDocument extends Document {
    title: string;
    description: string;
    company: mongoose.Types.ObjectId ;
    location: string;
    salary: {
        min: number;
        max: number;
    };
    requirements: string[];
    status: JobStatusType;
    createdAt: Date;
    updatedAt: Date;
}

export const jobSchema = new Schema<IJobDocument>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: { 
        type: String, 
        required: true 
    },
    company: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    salary: { 
        type: {
            min: {
                type: Number, 
                required: true 
            },
            max: {
                type: Number, 
                required: true 
            },
        },
        required: true ,
        validate: {
            validator(value: { min: number; max: number }) {
                return value.min <= value.max;
            },
            message: "Min salary must be less than or equal to max salary",
        },
    },
    requirements: [{
        type: String,
        trim: true,
        
    }],
    status: { 
        type: String, 
        enum: Object.values(JobStatus), 
        default: JobStatus.OPEN 
    },
},{timestamps: true}).index({ status: 1 }).index({ company: 1 }).index({ location: 1 }).index({
    title:'text',
    description:'text',
});

export const Job = mongoose.models.Job || mongoose.model<IJobDocument>("Job", jobSchema);