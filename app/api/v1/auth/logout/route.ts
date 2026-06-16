import { authService } from "@/features/auth/auth.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = asyncWrapper(async () => {
  await connectDB();
  const data = await authService.logout();
  return NextResponse.json(data);
});