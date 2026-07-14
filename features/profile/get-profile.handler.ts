import connectDB from "@/lib/db";
import { authService } from "@/features/auth/auth.services";
import { NextResponse } from "next/server";

export async function getProfileResponse() {
  await connectDB();
  const user = await authService.getUser();
  const { password: _password, ...publicUser } = user.toObject();
  return NextResponse.json(publicUser);
}
