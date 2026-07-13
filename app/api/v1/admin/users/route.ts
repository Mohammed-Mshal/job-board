import connectDB from "@/lib/db";
import { adminUsersService } from "@/features/admin-users/admin-users.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const data = await adminUsersService.listUsers(params);
  return NextResponse.json(data);
});
