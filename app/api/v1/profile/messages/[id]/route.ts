import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import connectDB from "@/lib/db";
import { userMessagesService } from "@/features/user-messages/user-messages.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = asyncWrapper(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.MESSAGE_ID_REQUIRED);
    }
    const body = await request.json();
    const data = await userMessagesService.markAsRead(id, body);
    return NextResponse.json(data);
  }
);
