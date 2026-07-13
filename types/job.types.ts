import { IUser } from "./user.types";

export enum JobStatus {
    OPEN = "open",
    CLOSED = "closed",
}
export enum JobType {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    INTERNSHIP = "internship",
    CONTRACT = "contract",
    TEMPORARY = "temporary",
    FREELANCE = "freelance",
}
export type JobTypeType = (typeof JobType)[keyof typeof JobType];
export enum WorkModel {
    ONSITE = "onsite",
    HYBRID = "hybrid",
    REMOTE = "remote"
}

export type WorkModelType = (typeof WorkModel)[keyof typeof WorkModel];

export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];
export interface IJob {
    _id: string;
    jobId: string;
    title: string;
    description: string;
    company: Partial<IUser>;
    location: string;
    salary: {
        min: number;
        max: number;
        salaryPeriod?: "year" | "month";
        currency?: string;
    };
    requirements: string[];
    coreResponsibilities: string[];
    qualifications: string[];
    status: JobStatusType;
    experience: number;
    jobType: JobTypeType;
    workModel: WorkModelType;
    relocation: boolean;
    visaSponsored: boolean;
    benefits: string[];
    hiringProcess: string[];
    FAQ: {
        question: string;
        answer: string;
    }[];
    createdAt: string;
    updatedAt: string;
}
export interface IJobFilters {
    page: number;
    limit: number;
    search: string;
    location: string;
    sortOrder: 'asc' | 'desc';
    salary: {
        min?: number | null;
        max?: number | null;
    };
    requirements: string[] | null;
    status: JobStatusType | null;
}