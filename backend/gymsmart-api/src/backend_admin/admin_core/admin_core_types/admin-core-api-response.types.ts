// RESPONSIBILITY: Defines the canonical API response envelope shared by framework-level infrastructure.
// FLOW: Controller return value â†’ AdminCoreResponseInterceptor â†’ ApiResponse<T> JSON envelope.

export interface AdminCorePaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AdminCoreValidationErrorItem {
  field: string;
  message: string;
}

export interface AdminCoreApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: AdminCorePaginationMeta;
  error?: string;
  errorCode?: string;
  statusCode?: number;
  validationErrors?: AdminCoreValidationErrorItem[];
}

export interface AdminCorePaginatedResult<T> {
  items: T[];
  meta: AdminCorePaginationMeta;
}

export interface AdminCoreErrorShape {
  error: string;
  errorCode: string;
  statusCode: number;
  message: string;
  validationErrors?: AdminCoreValidationErrorItem[];
}
