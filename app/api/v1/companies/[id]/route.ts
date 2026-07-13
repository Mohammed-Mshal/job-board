import { apiError, API_ERROR_CODES } from "@/lib/apiError";
import { companiesService } from "@/features/companies/companies.services";
import { asyncWrapper } from "@/lib/asyncWrapper";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncWrapper(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    await connectDB();
    const { id } = await params;
    if (!id) {
      throw apiError(400, API_ERROR_CODES.COMPANY_ID_REQUIRED);
    }
    const data = await companiesService.getCompanyById(id);
    return NextResponse.json(data);
  }
);
