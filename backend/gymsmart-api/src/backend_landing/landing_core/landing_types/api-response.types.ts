// RESPONSIBILITY: Defines the canonical response envelope shared by every HTTP success and error path.
// FLOW: Controller return â†’ ResponseInterceptor â†’ ApiResponse<T>.
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ValidationErrorItem {
  field: string;
  message: string;
}

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
