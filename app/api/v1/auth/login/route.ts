import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/features/auth/auth.services";
import { asyncWrapper } from "@/lib/asyncWrapper";

export const POST = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const { email, password } = await request.json();
  const data = await authService.login(email, password);
  return NextResponse.json(data);
});