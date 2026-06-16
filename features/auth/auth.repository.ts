import { User } from "@/models/user.model";
import { UserRoleType } from "@/constants/roles";
import { IMedia } from "@/types/media.types";
import { IMediaDocument } from "@/models/media.model";

export const authRepository = {
  findUserByEmail: async (email: string) => {
    return await User.findOne({ email }).select("+password");
  },
  findUserById: async (id: string) => {    
    return await User.findById(id);
  },
  createUser: async (
    name: string,
    email: string,
    password: string,
    description: string,
    location: string,
    role: UserRoleType,
    profileImage: IMediaDocument | null
  ) => {
    return await User.create({ name, email, password, description, location, role, profileImage });
  },
  updateUser: async (
    id: string,
    name: string,
    password: string,
    description: string,
    location: string,
    profileImage: IMediaDocument | null
  ) => {
    return await User.findByIdAndUpdate(
      id,
      { name, password, description, location, profileImage },
      { new: true }
    );
  },
  deleteUser: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};
