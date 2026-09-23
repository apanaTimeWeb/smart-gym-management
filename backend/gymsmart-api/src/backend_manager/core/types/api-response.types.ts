// RESPONSIBILITY: Owns backend core module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
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
