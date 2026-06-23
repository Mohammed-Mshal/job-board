import { UserRoleType } from "@/constants/roles";
import { IMedia } from "./media.types";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    profileImage: IMedia | null;
    role: UserRoleType;
    createdAt: string;
    updatedAt: string;
}

