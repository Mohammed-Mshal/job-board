import connectDB from "@/lib/db";
import { cmsService } from "@/features/cms/cms.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async () => {
  await connectDB();
  const data = await cmsService.getAdminContent();
  return NextResponse.json(data);
});

export const PUT = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const body = await request.json();
  const { locale, section, data } = body;
  const result = await cmsService.updateSection(locale, section, data);
  return NextResponse.json(result);
});
