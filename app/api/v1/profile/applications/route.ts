import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { applicationsServices } from "@/features/applications/applications.services";

export const GET = asyncWrapper(async () => {
    await connectDB();
    const data = await applicationsServices.getApplicationsByUserId();
    return NextResponse.json(data);
});
