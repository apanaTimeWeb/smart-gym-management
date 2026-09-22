// RESPONSIBILITY: Canonical success/error response envelope and validation item shape.
// FLOW: Controller result → ResponseInterceptor → ApiResponse<T>; exception filters use the same contract.
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';

export interface ValidationErrorItem { field: string; message: string }
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
