// RESPONSIBILITY: Defines the single canonical discriminated API success/error envelope used by every endpoint.
// FLOW: Controller result → CoreResponseInterceptor → CoreApiResponse success/error contract.

import { HttpStatus } from '@nestjs/common';

export interface ValidationErrorItem { field: string; message: string; }
export interface PaginationMeta { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean; }
export interface CoreApiSuccessResponse<T> { success: true; message: string; data: T; meta?: PaginationMeta; error?: never; errorCode?: never; statusCode?: never; validationErrors?: never; }
export interface CoreApiErrorResponse { success: false; message: string; data: null; meta?: never; error: string; errorCode: string; statusCode: number; validationErrors?: never; }
export interface CoreApiValidationErrorResponse { success: false; message: string; data: null; meta?: never; error: 'VALIDATION_ERROR'; errorCode: 'VALIDATION.DTO.FAILED'; statusCode: HttpStatus.BAD_REQUEST; validationErrors: ValidationErrorItem[]; }
export type CoreApiResponse<T> = CoreApiSuccessResponse<T> | CoreApiErrorResponse | CoreApiValidationErrorResponse;
