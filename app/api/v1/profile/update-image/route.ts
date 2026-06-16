import { userService } from "@/features/user/user.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const formData = await request.formData();
  const profileImage = formData.get("profileImage") as File;
  const data = await userService.updateProfileImage(profileImage);
  return NextResponse.json(data);
});