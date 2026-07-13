import mongoose, { Document, Schema } from "mongoose";
import { JobStatus, JobStatusType, JobType, JobTypeType, WorkModel, WorkModelType } from "@/types/job.types";
import { autoIncrementPlugin } from "@/lib/autoIncrementPlugin";

export interface IJobDocument extends Document {
    jobId: string;
    title: string;
    description: string;
    company: mongoose.Types.ObjectId ;
    location: string;
    salary: {
        min: number;
        max: number;
        salaryPeriod: "year" | "month";
        currency: string;
    };
    requirements: string[];
    status: JobStatusType;
    experience:number;
    coreResponsibilities:string[];
    qualifications:string[];
    jobType:JobTypeType;
    workModel:WorkModelType;
    relocation: boolean;
    visaSponsored: boolean;
    benefits: string[];
    hiringProcess: string[];
    FAQ: {
        question: string;
        answer: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
const salarySchema = new Schema({
    min: { 
        type: Number, 
        required: true 
    },
    max: { 
        type: Number, 
        required: true 
    },
    salaryPeriod: {
        type: String,
        required: true,
        enum: ["year", "month"],
    },
    currency: {
        type: String,
        required: true,
        trim: true,
    }
}, { _id: false });

const FAQSchema = new Schema({
    question: {
        type: String,
        trim: true,
    },
    answer: {
        type: String,
        trim: true,
    }
}, { _id: false });

export const jobSchema = new Schema<IJobDocument>({
    jobId:{
        type: String,
        unique:true
    },
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
        type: salarySchema,
        required: true,
        validate: {
            validator(value: { min: number; max: number; currency: string; salaryPeriod: "month" | "year" }) {
                if (
                    typeof value.min !== "number" ||
                    typeof value.max !== "number" ||
                    isNaN(value.min) ||
                    isNaN(value.max)
                ) {
                    return false;
                }
                return value.min <= value.max;
            },
            message: "Min salary must be less than or equal to max salary",
        },
    },
    experience: {
        type: Number,
        required: true,
    },
    coreResponsibilities: [{
        type: String,
        trim: true,
        
    }],
    qualifications: [{
        type: String,
        trim: true,
        
    }],
    requirements: [{
        type: String,
        trim: true,
        
    }],
    jobType: {
        type: String,
        enum: Object.values(JobType),
        required: true,
    },
    workModel: { 
        type: String,
        enum: Object.values(WorkModel),
        required: true
    },
    status: { 
        type: String, 
        enum: Object.values(JobStatus), 
        default: JobStatus.OPEN 
    },
    relocation: {
        type: Boolean,
        default: false
    },
    visaSponsored: {
        type: Boolean,
        default: false
    },
    benefits: [{
        type: String,
        trim: true,
    }],
    hiringProcess: [{
        type: String,
        trim: true,
    }],
    FAQ: [{
        type: FAQSchema,
        required: true,
    }],

},{timestamps: true}).index({ status: 1 }).index({ company: 1 }).index({ location: 1 }).index({
    title:'text',
    description:'text',
});
jobSchema.plugin(autoIncrementPlugin,{
    field:'jobId',
})
export const Job = mongoose.models.Job || mongoose.model<IJobDocument>("Job", jobSchema);