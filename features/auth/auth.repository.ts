import { User } from "@/models/user.model";
import { UserRoleType } from "@/constants/roles";
import { IMediaDocument } from "@/models/media.model";

export const authRepository = {
  findUserByEmail: async (email: string) => {
    return await User.findOne({ email })
      .select("+password")
      .populate("profileImage");
  },
  findUserById: async (id: string) => {    
    return await User.findOne({userId:id}).populate("profileImage");
  },
  createUser: async (
    name: string,
    email: string,
    password: string,
    description: string,
    location: string,
    role: UserRoleType,
    profileImage: IMediaDocument | null,
    teamSize: {
      min: number;
      max: number;
    }
  ) => {
    return await User.create({ name, email, password, description, location, role, profileImage, teamSize });
  },
  updateUser: async (
    id: string,
    name: string,
    password: string,
    description: string,
    location: string,
    profileImage: IMediaDocument | null,
    teamSize: {
      min: number;
      max: number;
    }
  ) => {
    return await User.findOneAndUpdate(
      {userId:id},
      { name, password, description, location, profileImage, teamSize },
      { new: true }
    );
  },
  deleteUser: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};
