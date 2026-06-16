import { USER_ROLES, UserRoleType } from "@/constants/roles";
import { IMedia } from "@/types/media.types";
import mongoose, { Document,  Schema } from "mongoose";
import { IMediaDocument } from "./media.model";

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    description: string;
    location:string
    profileImage: IMediaDocument | IMedia | null;
    role: UserRoleType;
    createdAt: Date;
    updatedAt: Date;
  }

const userSchema = new Schema<IUserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    profileImage: { 
        type: Schema.Types.ObjectId, 
        ref: "Media", 
        default: null,
    },
    location: { 
        type: String, 
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER,
    },
},{timestamps: true}).index({   
    name: "text",
    description: "text",
});

export const User = mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);