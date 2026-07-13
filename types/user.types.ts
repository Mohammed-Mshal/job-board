import { UserRoleType } from "@/constants/roles";
import { UserStatusType } from "@/constants/userStatus";
import { IMedia } from "./media.types";

export interface IUser {
    _id: string;
    userId: string;
    name: string;
    email: string;
    password: string;
    profileImage: IMedia | null;
    role: UserRoleType;
    status: UserStatusType;
    teamSize: {
        min: number;
        max: number;
    };
    company: IUser | null;
    description: string;
    location: string;
    savedJobs?: string[];
    createdAt: string;
    updatedAt: string;
}

