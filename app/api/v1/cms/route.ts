import connectDB from "@/lib/db";
import { cmsService } from "@/features/cms/cms.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import { NextRequest, NextResponse } from "next/server";
import { isCmsLocale } from "@/features/cms/cms.defaults";

export const GET = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const locale = request.nextUrl.searchParams.get("locale") ?? "en";
  const content = await cmsService.getPublicContent(
    isCmsLocale(locale) ? locale : "en"
  );
  return NextResponse.json(content);
});
