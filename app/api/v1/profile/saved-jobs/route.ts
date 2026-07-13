import { savedJobsService } from "@/features/saved-jobs/saved-jobs.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
  await connectDB();
  const data = await savedJobsService.getSavedJobs();
  return NextResponse.json(data);
});
