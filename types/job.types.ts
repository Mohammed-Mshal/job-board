import { IUser } from "./user.types";

export enum JobStatus {
    OPEN = "open",
    CLOSED = "closed",
}
export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];
export interface IJob {
    _id: string;
    title: string;
    description: string;
    company: Partial<IUser>;
    location: string;
    salary: {
        min: number;
        max: number;
    };
    requirements: string[];
    status: JobStatusType;
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