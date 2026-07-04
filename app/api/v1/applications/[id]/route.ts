import connectDB from "@/lib/db";

import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
import { applicationsServices } from "@/features/applications/applications.services";
import { HttpError } from "@/lib/httpError";
import { IMediaDocument } from "@/models/media.model";
// Get application by id
export const GET = asyncWrapper(async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw new HttpError(400, { error: "Application ID is required" });
    }
    const data = await applicationsServices.getApplicationById(id);
    return NextResponse.json(data);
}); 

// Update application
export const PUT = asyncWrapper(async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw new HttpError(400, { error: "Application ID is required" });
    }
    const formData = await request.formData();
    const coverLetter = formData.get("coverLetter");
    const resume = formData.get("resume");
    const payload: { coverLetter?: string; resume?: File } = {};
    if (typeof coverLetter === "string") {
      payload.coverLetter = coverLetter;
    }
    if (resume instanceof File && resume.size > 0) {
      payload.resume = resume;
    }
    const data = await applicationsServices.updateApplication(id, { coverLetter: payload.coverLetter, resume: payload.resume as unknown as File });
    return NextResponse.json(data);
});

// Update application status
export const PATCH = asyncWrapper(async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw new HttpError(400, { error: "Application ID is required" });
    }
    const data = await applicationsServices.updateApplicationStatus(id, await request.json());
    return NextResponse.json(data, { status: 200 });
});

// Delete application
export const DELETE = asyncWrapper(async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw new HttpError(400, { error: "Application ID is required" });
    }
    const data = await applicationsServices.deleteApplication(id);
    return NextResponse.json(data);
});