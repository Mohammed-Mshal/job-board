import { contactService } from "@/features/contact/contact.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncWrapper(async (request: NextRequest) => {
  const body = await request.json();
  const data = await contactService.submitContact(body);
  return NextResponse.json(data, { status: 201 });
});
