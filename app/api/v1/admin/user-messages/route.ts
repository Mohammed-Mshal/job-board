import connectDB from "@/lib/db";
import { userMessagesService } from "@/features/user-messages/user-messages.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const data = await userMessagesService.sendToUser(body);
  return NextResponse.json(data, { status: 201 });
});
