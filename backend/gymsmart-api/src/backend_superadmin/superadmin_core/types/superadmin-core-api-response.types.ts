// RESPONSIBILITY: Defines the canonical discriminated API response contract for every backend endpoint.
// FLOW: Controller return/exception -> global interceptor/filter -> SuperadminSuccessApiResponse<T> or SuperadminErrorApiResponse.
import type { SuperadminPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';

export interface SuperadminValidationErrorItem {
  field: string;
  message: string;
}

export interface SuperadminSuccessApiResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: SuperadminPaginationMeta;
  error?: never;
  errorCode?: never;
  statusCode?: never;
  validationErrors?: never;
}

export interface SuperadminErrorApiResponse {
  success: false;
  message: string;
  data: null;
  meta?: never;
  error: string;
  errorCode: string;
  statusCode: number;
  validationErrors?: SuperadminValidationErrorItem[];
}

export type ApiResponse<T> = SuperadminSuccessApiResponse<T> | SuperadminErrorApiResponse;
