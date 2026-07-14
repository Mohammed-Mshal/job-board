import { contactService } from "@/features/contact/contact.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { enforceRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  await enforceRateLimit(request, RATE_LIMITS.contact);
  const body = await request.json();
  const data = await contactService.submitContact(body);
  return NextResponse.json(data, { status: 201 });
});
