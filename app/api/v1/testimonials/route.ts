import connectDB from "@/lib/db";
import { testimonialsService } from "@/features/testimonials/testimonials.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
  await connectDB();
  const testimonials = await testimonialsService.getApproved();
  return NextResponse.json(testimonials);
});

export const POST = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const data = await testimonialsService.submit(body);
  return NextResponse.json(data, { status: 201 });
});
