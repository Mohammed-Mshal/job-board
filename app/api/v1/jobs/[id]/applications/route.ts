import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { HttpError } from "@/lib/httpError";
import { applicationsServices } from "@/features/applications/applications.services";
export const GET = asyncWrapper(async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw new HttpError(400, { error: "Job ID is required" });
    }
    const data = await applicationsServices.getApplicationsByJobId(id);
    return NextResponse.json(data);
});