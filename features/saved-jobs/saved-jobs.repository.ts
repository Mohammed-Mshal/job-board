import { User } from "@/models/user.model";

type SavedJobsUser = {
  savedJobs?: string[];
  role?: string;
};

export const savedJobsRepository = {
  findUserWithSavedJobs: async (userId: string) => {
    const user = await User.findOne({ userId }).select("savedJobs role").lean<SavedJobsUser>();

    if (!user) return null;

    return {
      ...user,
      savedJobs: user.savedJobs ?? [],
    };
  },

  addSavedJob: async (userId: string, jobId: string) => {
    return await User.findOneAndUpdate(
      { userId },
      { $addToSet: { savedJobs: jobId } },
      { new: true }
    )
      .select("savedJobs")
      .lean();
  },

  removeSavedJob: async (userId: string, jobId: string) => {
    return await User.findOneAndUpdate(
      { userId },
      { $pull: { savedJobs: jobId } },
      { new: true }
    )
      .select("savedJobs")
      .lean();
  },

  isJobSaved: (user: SavedJobsUser, jobId: string) => {
    return user.savedJobs?.includes(jobId) ?? false;
  },
};
