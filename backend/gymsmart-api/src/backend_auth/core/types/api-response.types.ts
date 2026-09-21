// RESPONSIBILITY: Defines the single canonical API response envelope shared by all JSON endpoints.
// FLOW: Controller return -> CoreResponseInterceptor OR exception filter -> ApiResponse<T>.

import type { PaginationMeta } from '@/backend_auth/core/types/pagination.types';
import type { ValidationErrorItem } from '@/backend_auth/core/types/validation-error.types';
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: PaginationMeta;
  error?: string;
  errorCode?: string;
  statusCode?: number;
  validationErrors?: ValidationErrorItem[];
}
