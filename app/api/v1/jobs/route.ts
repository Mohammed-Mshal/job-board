import { jobsService } from "@/features/jobs/jobs.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const data = await jobsService.getJobs(request.nextUrl.searchParams);
  return NextResponse.json(data);
});

export const POST = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const data = await jobsService.createJob(body);
  return NextResponse.json(data, { status: 201 });
});
