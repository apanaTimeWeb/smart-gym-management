// RESPONSIBILITY: Defines the canonical validation error item and validation-error response contract.
// FLOW: ValidationPipe -> CoreValidationExceptionFilter -> ValidationErrorResponse -> frontend.

import type { ApiResponse } from '@/core/types/api-response.types';

export interface ValidationErrorItem {
  field: string;
  message: string;
}

export interface ValidationErrorResponse extends ApiResponse<null> {
  validationErrors: ValidationErrorItem[];
}
