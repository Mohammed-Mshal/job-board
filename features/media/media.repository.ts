import { Media } from "@/models/media.model";

type CreateMediaData = {
  mediaId: string;
  url: string;
  mimeType: string;
  size: number;
  altText: string;
};

export const mediaRepository = {
  create: async (data: CreateMediaData) => {
    return await Media.create(data);
  },
  deleteById: async (id: string) => {
    return await Media.findByIdAndDelete(id);
  },
  findById: async (id: string) => {
    return await Media.findById(id);
  },
  findByMediaId: async (mediaId: string) => {
    return await Media.findOne({ mediaId });
  },
};
