import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { jobsService } from "@/features/jobs/jobs.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.JOB_ID_REQUIRED);
    }
    const data = await jobsService.getJobById(id);
    return NextResponse.json(data);
  }
);

export const PATCH = asyncWrapper(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.JOB_ID_REQUIRED);
    }
    const newData = await request.json();
    const data = await jobsService.updateJob(id, newData);
    return NextResponse.json(data);
  }
);

export const DELETE = asyncWrapper(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.JOB_ID_REQUIRED);
    }
    const data = await jobsService.deleteJob(id);
    return NextResponse.json(data);
  }
);
