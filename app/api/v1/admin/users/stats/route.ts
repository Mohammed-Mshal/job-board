import connectDB from "@/lib/db";
import { adminUsersService } from "@/features/admin-users/admin-users.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
  await connectDB();
  const stats = await adminUsersService.getStats();
  return NextResponse.json(stats);
});
