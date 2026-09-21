// RESPONSIBILITY: Defines the canonical API response envelope shared by framework-level infrastructure.
// FLOW: Controller return value â†’ CoreResponseInterceptor â†’ ApiResponse<T> JSON envelope.

export interface CorePaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CoreValidationErrorItem {
  field: string;
  message: string;
}

export interface CoreApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: CorePaginationMeta;
  error?: string;
  errorCode?: string;
  statusCode?: number;
  validationErrors?: CoreValidationErrorItem[];
}

export interface CorePaginatedResult<T> {
  items: T[];
  meta: CorePaginationMeta;
}

export interface CoreErrorShape {
  error: string;
  errorCode: string;
  statusCode: number;
  message: string;
  validationErrors?: CoreValidationErrorItem[];
}
