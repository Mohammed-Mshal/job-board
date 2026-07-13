import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import connectDB from "@/lib/db";
import { testimonialsService } from "@/features/testimonials/testimonials.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = asyncWrapper(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.TESTIMONIAL_ID_REQUIRED);
    }
    const body = await request.json();
    const data = await testimonialsService.updateStatus(id, body);
    return NextResponse.json(data);
  }
);

export const DELETE = asyncWrapper(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.TESTIMONIAL_ID_REQUIRED);
    }
    const data = await testimonialsService.delete(id);
    return NextResponse.json(data);
  }
);
