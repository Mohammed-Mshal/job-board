import mongoose, { Document, Schema } from "mongoose";

export interface IMediaDocument extends Document {
    mediaId: string;
    altText: string;
    url: string;
    mimeType: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;   
}

export const mediaSchema = new Schema<IMediaDocument>({
    mediaId: { type: String, required: true },
    altText: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
},{timestamps: true});


export const Media = mongoose.models.Media || mongoose.model<IMediaDocument>("Media", mediaSchema);