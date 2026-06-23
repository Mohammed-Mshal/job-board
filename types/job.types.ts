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