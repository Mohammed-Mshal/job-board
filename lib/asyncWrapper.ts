/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { API_ERROR_CODES } from "./apiErrorCodes";
import { getRequestLocale } from "./getRequestLocale";
import { HttpError } from "./httpError";
import { translateApiErrorBody } from "./translateApiError";

export const asyncWrapper = (fn: (...args: any[]) => Promise<any>) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(error);
      const request = args[0] as NextRequest | undefined;
      const locale = getRequestLocale(request);

      if (error instanceof HttpError) {
        const body = translateApiErrorBody(error.body, locale);
        return NextResponse.json(body, { status: error.status });
      }

      return NextResponse.json(
        translateApiErrorBody(
          {
            code: API_ERROR_CODES.INTERNAL_SERVER_ERROR,
            error:
              error instanceof Error
                ? error.message
                : API_ERROR_CODES.INTERNAL_SERVER_ERROR,
          },
          locale
        ),
        { status: 500 }
      );
    }
  };
};