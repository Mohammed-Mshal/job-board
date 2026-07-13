import { USER_ROLES, UserRoleType } from "@/constants/roles";
import { USER_STATUS, UserStatusType } from "@/constants/userStatus";
import { IMedia } from "@/types/media.types";
import mongoose, { Document,  Schema } from "mongoose";
import { IMediaDocument } from "./media.model";
import { autoIncrementPlugin } from "@/lib/autoIncrementPlugin";

export interface IUserDocument extends Document {
    userId:string;
    name: string;
    email: string;
    password: string;
    description: string;
    location:string;
    teamSize: {
        min: number;
        max: number;
    };
    employees:IUserDocument[] | null;
    profileImage: IMediaDocument | IMedia | null;
    role: UserRoleType;
    status: UserStatusType;
    savedJobs: string[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>({
    userId:{ type: String, unique: true },
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
    teamSize: { 
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
        required: false,
        validate: {
            validator(value: { min: number; max: number }) {
                // Handle null/undefined/empty as optional and valid
                if (!value || typeof value.min !== 'number' || typeof value.max !== 'number') {
                    return true;
                }
                return value.min <= value.max;
            },
            message: "Min team size must be less than or equal to max team size",
        },
    },
    employees: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: false,
        default: [],
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(USER_STATUS),
        default: USER_STATUS.ACTIVE,
    },
    savedJobs: {
        type: [String],
        default: [],
    },
},{timestamps: true}).index({   
    name: "text",
    description: "text",
});
userSchema.plugin(autoIncrementPlugin,{
    field:'userId',
})

if (mongoose.models.User) {
    delete mongoose.models.User;
}

export const User = mongoose.model<IUserDocument>("User", userSchema);