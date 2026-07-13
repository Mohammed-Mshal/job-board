import connectDB from "@/lib/db";
import { cmsService } from "@/features/cms/cms.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
import { ContactSubmissionStatus } from "@/types/cms.types";

export const GET = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const status = request.nextUrl.searchParams.get("status") as
    | ContactSubmissionStatus
    | null;
  const submissions = await cmsService.listSubmissions(status ?? undefined);
  return NextResponse.json(submissions);
});
