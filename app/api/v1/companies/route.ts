import { companiesService } from "@/features/companies/companies.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(async (request: NextRequest) => {
  await connectDB();
  const data = await companiesService.getCompanies(request.nextUrl.searchParams);
  return NextResponse.json(data);
});
