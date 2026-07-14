import { refreshSession } from "@/lib/auth";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { NextResponse } from "next/server";

export const POST = asyncWrapper(async () => {
  const session = await refreshSession();

  if (!session) {
    throw apiError(401, API_ERROR_CODES.UNAUTHORIZED);
  }

  return NextResponse.json({ message: "Session refreshed" });
});
