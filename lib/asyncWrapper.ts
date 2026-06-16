/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { HttpError } from "./httpError";

export const asyncWrapper = (fn: (...args: any[]) => Promise<any>) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        return NextResponse.json(error.body, { status: error.status });
      }
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};