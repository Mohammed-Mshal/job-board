import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
import { applicationsServices } from "@/features/applications/applications.services";
export const GET = asyncWrapper(async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.JOB_ID_REQUIRED);
    }
    const data = await applicationsServices.getApplicationsByJobId(id);
    return NextResponse.json(data);
});