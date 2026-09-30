/**
 * RESPONSIBILITY: Represents an Auth API failure using a safe message and machine-readable error code.
 * DATA FLOW: Auth API boundary -> AuthApiError -> Login mutation error mapping.
 */
import type { ValidationErrorItem } from '@/lib/api';

export class AuthApiError extends Error {
  public readonly errorCode?: string;
  public readonly validationErrors?: ValidationErrorItem[];

  public constructor(message = '', errorCode?: string, validationErrors?: ValidationErrorItem[]) {
    super(message);
    this.name = 'AuthApiError';
    this.errorCode = errorCode;
    this.validationErrors = validationErrors;
  }
}

