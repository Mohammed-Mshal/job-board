import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import connectDB from "@/lib/db";
import { adminUsersService } from "@/features/admin-users/admin-users.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = asyncWrapper(
  async (request: NextRequest, { params }: { params: { userId: string } }) => {
    await connectDB();
    const { userId } = await params;
    if (!userId) {
      throw apiError(400, API_ERROR_CODES.USER_ID_REQUIRED);
    }
    const body = await request.json();
    const data = await adminUsersService.updateUser(userId, body);
    return NextResponse.json(data);
  }
);
