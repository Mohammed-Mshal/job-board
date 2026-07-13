import connectDB from "@/lib/db";
import { userMessagesService } from "@/features/user-messages/user-messages.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
  await connectDB();
  const data = await userMessagesService.getMyMessages();
  return NextResponse.json(data);
});
