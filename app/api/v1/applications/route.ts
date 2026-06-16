import { applicationsServices } from "@/features/applications/applications.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get applications by user id
export const GET = asyncWrapper(async (request: NextRequest) => {
    await connectDB();
    const data = await applicationsServices.getApplicationsByUserId();
    return NextResponse.json(data);
});

// Apply for a job
export const POST = asyncWrapper(async (request: NextRequest) => {
    await connectDB();
    const formData = await request.formData();
    const jobId = formData.get("jobId") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;
    const data = await applicationsServices.applyForJob(jobId, coverLetter, resume);
    return NextResponse.json(data, { status: 201 });
});