// RESPONSIBILITY: Defines the transport-level canonical API response and pagination contracts used across the supplied Landing backend.
// FLOW: Controller return/error -> global HTTP infrastructure -> discriminated LandingApiResponse<T>.
export interface LandingPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LandingValidationErrorItem {
  field: string;
  message: string;
}

export interface LandingApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: LandingPaginationMeta;
}

export interface LandingApiErrorResponse {
  success: false;
  message: string;
  data: null;
  error: string;
  errorCode: string;
  statusCode: number;
  validationErrors?: LandingValidationErrorItem[];
}

/**
 * Intent: Prevent ambiguous response data shapes by discriminating success and error envelopes on the success flag.
 * Edge Cases: Successful null-data commands use T = null; errors always carry null data and explicit machine-readable fields.
 * Side Effects: None.
 * AI Notes: Do not widen this type back to `success: boolean` or optional error fields on successful responses.
 */
export type LandingApiResponse<T> = LandingApiSuccessResponse<T> | LandingApiErrorResponse;
