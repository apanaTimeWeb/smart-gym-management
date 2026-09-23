// RESPONSIBILITY: Defines the canonical discriminated API response contract for every backend endpoint.
// FLOW: Controller return/exception -> global interceptor/filter -> SuccessApiResponse<T> or ErrorApiResponse.
import type { PaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';

export interface ValidationErrorItem {
  field: string;
  message: string;
}

export interface SuccessApiResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
  error?: never;
  errorCode?: never;
  statusCode?: never;
  validationErrors?: never;
}

export interface ErrorApiResponse {
  success: false;
  message: string;
  data: null;
  meta?: never;
  error: string;
  errorCode: string;
  statusCode: number;
  validationErrors?: ValidationErrorItem[];
}

export type ApiResponse<T> = SuccessApiResponse<T> | ErrorApiResponse;
