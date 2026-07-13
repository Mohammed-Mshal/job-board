import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { savedJobsService } from "@/features/saved-jobs/saved-jobs.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.JOB_ID_REQUIRED);
    }
    const data = await savedJobsService.getSaveStatus(id);
    return NextResponse.json(data);
  }
);

export const POST = asyncWrapper(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;  
    if (!id) {
      throw apiError(400, API_ERROR_CODES.JOB_ID_REQUIRED);
    }
    const data = await savedJobsService.toggleSaveJob(id);
    return NextResponse.json(data);
  }
);
