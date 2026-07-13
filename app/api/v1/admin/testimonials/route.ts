import connectDB from "@/lib/db";
import { testimonialsService } from "@/features/testimonials/testimonials.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const testimonials = await testimonialsService.listAdmin(params);
  return NextResponse.json(testimonials);
});
