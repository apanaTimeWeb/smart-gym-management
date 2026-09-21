// RESPONSIBILITY: Defines the canonical API response envelope and validation error contract.
// FLOW: Controller return -> ResponseInterceptor/ExceptionFilter -> frontend ApiResponse<T>.
import type { PaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
export interface ValidationErrorItem { field: string; message: string; }
export interface ApiResponse<T> { success: boolean; message: string; data: T | null; meta?: PaginationMeta; error?: string; errorCode?: string; statusCode?: number; validationErrors?: ValidationErrorItem[]; }
