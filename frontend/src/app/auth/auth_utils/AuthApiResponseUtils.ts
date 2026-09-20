/**
 * RESPONSIBILITY: Builds canonical ApiResponse envelopes for Auth-owned Next.js API routes.
 * DATA FLOW: Route handler outcome -> canonical success/error envelope -> JSON response consumed by Auth clients.
 */
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import type { ApiResponse, ValidationErrorItem } from '@/lib/api';

export const AuthApiResponseUtils = {
  success<T>(message: string, data: T, statusCode = StatusCodes.OK) {
    const body: ApiResponse<T> = { success: true, message, data };
    return NextResponse.json(body, { status: statusCode });
  },

  failure(
    message: string,
    statusCode: number,
    error: string,
    errorCode: string,
    validationErrors?: ValidationErrorItem[],
  ) {
    const body: ApiResponse<null> = {
      success: false,
      message,
      data: null,
      error,
      errorCode,
      statusCode,
      ...(validationErrors ? { validationErrors } : {}),
    };
    return NextResponse.json(body, { status: statusCode });
  },
};
