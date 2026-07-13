import imageKit from "@/lib/imageKit";
import { checkFile } from "@/lib/checkFile";
import { apiError } from "@/lib/apiError";
import { IMedia } from "@/types/media.types";
import { mediaRepository } from "./media.repository";
import { IMediaDocument } from "@/models/media.model";

export const mediaService = {
  createMedia: async (file: File, folder: string = "media", maxSize: number = 1024 * 1024 * 5, allowedTypes: string[] = ["image/jpeg", "image/png", "image/webp"]) : Promise<IMediaDocument> => {
    const checkFileResult = checkFile(file, maxSize, allowedTypes);
    if (checkFileResult !== true) {
      throw apiError(400, checkFileResult.code, checkFileResult.params);
    }

    const buffer = await file.arrayBuffer();
    const mediaResponse = await imageKit.upload({
      file: Buffer.from(buffer),
      fileName: file.name,
      folder: `job-board-media/${folder}`,
    });
    
    return await mediaRepository.create({
      mediaId: mediaResponse.fileId,
      url: mediaResponse.url,
      mimeType: mediaResponse.fileType,
      size: mediaResponse.size,
      altText: file.name,
    });
  },

  deleteMedia: async (media: IMedia) => {    
    await imageKit.deleteFile(media.mediaId);
    const deletedMediaRecord = await mediaRepository.deleteById(media._id);
    return !!deletedMediaRecord;
  },

  findMediaById: async (id: string) => {
    return await mediaRepository.findById(id);
  },

  findMediaByMediaId: async (mediaId: string) => {
    return await mediaRepository.findByMediaId(mediaId);
  },
};
