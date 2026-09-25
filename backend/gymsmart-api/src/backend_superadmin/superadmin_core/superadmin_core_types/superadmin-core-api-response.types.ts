// RESPONSIBILITY: Defines the canonical discriminated API response contract for every backend endpoint.
// FLOW: Controller return/exception -> global interceptor/filter -> SuperadminSuccessApiResponse<T> or SuperadminErrorApiResponse.
import type { SuperadminPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';

/**
 * Primary Intent: Defines SuperadminValidationErrorItem as the interface-level contract for superadmin-core-api-response.types.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminValidationErrorItem {
  field: string;
  message: string;
}

/**
 * Primary Intent: Defines the SuperadminSuccessApiResponse type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
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

/**
 * Primary Intent: Defines SuperadminErrorApiResponse as the interface-level contract for superadmin-core-api-response.types.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
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
