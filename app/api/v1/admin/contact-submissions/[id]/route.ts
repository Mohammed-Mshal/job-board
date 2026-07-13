import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import connectDB from "@/lib/db";
import { cmsService } from "@/features/cms/cms.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
export const PATCH = asyncWrapper(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.SUBMISSION_ID_REQUIRED);
    }
    const body = await request.json();
    const data = await cmsService.updateSubmissionStatus(id, body.status);
    return NextResponse.json(data);
  }
);
