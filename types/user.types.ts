import { UserRoleType } from "@/constants/roles";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    profileImage: string;
    role: UserRoleType;
    createdAt: string;
    updatedAt: string;
}

