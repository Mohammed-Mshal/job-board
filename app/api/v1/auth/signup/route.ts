import { UserRoleType } from "@/constants/roles";
import { authService } from "@/features/auth/auth.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { enforceRateLimit, RATE_LIMITS } from "@/lib/rateLimit";

import { NextRequest, NextResponse } from "next/server";

export const POST = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  await enforceRateLimit(request, RATE_LIMITS.signup);
  const formData = await request.formData();
  const role = formData.get("role") as UserRoleType;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const profileImage = formData.get("profileImage") as File | null;
  const teamSize = {
    min: parseInt(formData.get("teamSizeMin") as unknown as string),
    max: parseInt(formData.get("teamSizeMax") as unknown as string),
  };
  const data = await authService.register(
    name,
    email,
    password,
    confirmPassword,
    description,
    location,
    teamSize,
    profileImage,
    role
  );
  return NextResponse.json(data, { status: 201 });
});