import { userService } from "@/features/user/user.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const data = await userService.updateProfile(body);
  return NextResponse.json(data);
});