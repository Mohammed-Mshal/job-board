import connectDB from "@/lib/db";

import { authService } from "@/features/auth/auth.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
  await connectDB();
  const user = await authService.getUser();
  const { password: _password, ...publicUser } = user.toObject();
  return NextResponse.json(publicUser);
});
